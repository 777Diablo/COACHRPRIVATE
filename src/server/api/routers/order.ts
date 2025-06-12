import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "@/server/api/trpc";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const orderRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.order.findMany({
      include: {
        user: {
          select: { name: true, email: true, image: true },
        },
        items: {
          include: {
            program: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.order.findUnique({
        where: { id: input.id },
        include: {
          items: {
            include: {
              program: true,
            },
          },
        },
      });
    }),

  getByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      let userId = input.userId;

      if (input.userId === "me") {
        userId = ctx.session.user.id;
      }

      return await ctx.db.order.findMany({
        where: { userId: userId },
        include: {
          items: {
            include: {
              program: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        items: z.array(
          z.object({
            programId: z.string(),
            price: z.number(),
          }),
        ),
        totalPrice: z.number(), // Total cost of all items
        paymentMethod: z.nativeEnum(PaymentMethod),
        paymentId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;
      let userId = session.user.id;

      if (session.user.role == "admin" && !input.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User id is required",
        });
      }

      if (input.userId && session.user.role == "admin") {
        userId = input.userId;
      }

      try {
        // Create the order
        const order = await ctx.db.order.create({
          data: {
            userId: userId,
            totalPrice: input.totalPrice,
            status: "PENDING",
            // TODO: Initial status should be PENDING
            // its just a work around, to mark the order as failed, if not processed
            // add a cron job to check for unprocessed orders in future and mark them as failed
            paymentStatus: "FAILED",
            paymentMethod: input.paymentMethod,
            paymentId: input.paymentId,
            items: {
              create: input.items.map((item) => ({
                programId: item.programId,
                price: item.price,
              })),
            },
          },
        });

        return {
          success: true,
          order,
          message: "Order created successfully",
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: (error as string) || "Failed to create order",
        };
      }
    }),

  updateOrderStatus: protectedProcedure
    .input(
      z.object({
        orderId: z.string(), // The ID of the order
        status: z.nativeEnum(OrderStatus).optional(), // Enum for order statuses
        paymentStatus: z.nativeEnum(PaymentStatus),
        paymentId: z.string(),
        razorpay_payment_id: z.string(),
        razorpay_order_id: z.string(),
        razorpay_signature: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { orderId, status, paymentStatus } = input;

      // Fetch the order
      const order = await ctx.db.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: {
              program: true,
            },
          },
        }, // Include associated items
      });

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      const payload: {
        status?: OrderStatus;
        paymentStatus: PaymentStatus;
        paymentId?: string;
      } = {
        paymentStatus,
      };

      if (status) payload.status = status;

      // If the payment status is "FAILED", set the order status to "PENDING"
      if (paymentStatus == "FAILED" || paymentStatus == "PENDING") {
        payload.status = "PENDING";
      }

      if (paymentStatus === "SUCCESS") {
        payload.paymentId = `PID_${Math.floor(Math.random() * 1000000000)}`;
        payload.status = "COMPLETED";
      }

      // Update the order status
      await ctx.db.order.update({
        where: { id: orderId },
        data: payload,
      });

      if (paymentStatus !== "SUCCESS") {
        return {
          message: "Order status updated successfully.",
        };
      }

      // Create ProgramEnrollments for each order item
      const enrollments = await Promise.all(
        order.items.map(async (item) => {
          // Fetch the program details
          const program = await ctx.db.program.findUnique({
            where: { id: item.programId },
          });

          if (!program) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Program with ID ${item.programId} not found.`,
            });
          }

          // Create the enrollment
          return ctx.db.programEnrollment.create({
            data: {
              userId: order.userId,
              programId: item.programId,
              status: "PENDING", // Default status
              type: item.program.type,
              includePsycometric: program.includePsycometric ?? false,
            },
          });
        }),
      );

      return {
        message: "Order status updated and enrollments created successfully.",
        enrollments,
      };
    }),
});
