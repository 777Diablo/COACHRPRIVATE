import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { filterUndefinedProperties } from "@/utils";

export const inquiryRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        message: z.string().optional(),
        mobile: z.string(),
        programId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.inquiry.create({
        data: {
          name: input.name,
          email: input.email,
          message: input.message ?? "",
          mobile: input.mobile,
          programId: input.programId,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.inquiry.findMany({
      include: {
        program: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.inquiry.findUnique({ where: { id: input.id } });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        message: z.string().optional(),
        mobile: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Filter out undefined fields
      const dataToUpdate =
        filterUndefinedProperties<Partial<typeof input>>(input);

      return ctx.db.inquiry.update({
        where: { id: input.id },
        data: dataToUpdate,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.inquiry.delete({ where: { id: input.id } });
    }),
});
