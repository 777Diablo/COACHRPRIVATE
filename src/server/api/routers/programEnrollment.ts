import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ParticipationStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const programEnrollmentRouter = createTRPCRouter({
  //   get all program enrollments
  getAll: protectedProcedure
    .input(
      z
        .object({
          program: z.array(z.string()).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      let programIds;
      if (input?.program && input.program.length > 0) {
        programIds = input.program;
      }

      try {
        const programs = await ctx.db.programEnrollment.findMany({
          where: { ...(programIds && { programId: { in: programIds } }) },
          include: {
            user: { select: { name: true, email: true, image: true } },
            program: { select: { name: true } },
            coach: { select: { name: true, email: true, image: true } },
          },
        });
        return { list: programs };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch programs enrollments",
        });
      }
    }),

  //   get one program enrollment
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.programEnrollment.findUnique({
        where: { id: input.id },
        include: {
          coach: { select: { name: true, email: true, image: true } },
          user: { select: { name: true, email: true, image: true } },
          program: true,
        },
      });
    }),

  // get program enrollments by user
  getByUserId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      let userId = input.id;

      if (input.id === "me") {
        userId = ctx.session.user.id;
      }

      return ctx.db.programEnrollment.findMany({
        where: { userId: userId },
        include: {
          program: { select: { name: true } },
          coach: { select: { name: true, email: true, image: true } },
        },
      });
    }),

  // get all program enrollments by assigned coach
  getByAssignedCoach: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      let userId = input.id;

      if (input.id === "me") {
        userId = ctx.session.user.id;
      }

      return ctx.db.programEnrollment.findMany({
        where: { assignedCoach: userId },
        include: {
          program: { select: { name: true } },
          user: { select: { name: true, email: true, image: true } },
        },
      });
    }),

  // update program enrollment
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(ParticipationStatus).optional(),
        meetingUrl: z.string().optional(),
        assignedCoach: z.string().optional(),
        scheduledAt: z.date().optional(),
        feedback: z.string().optional(),
        score: z.number().optional(),
        recordingUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...dataToUpdate } = input;

      // if assigned coach, verify if it's a valid coach
      if (dataToUpdate.assignedCoach) {
        const assignedCoach = await ctx.db.user.findUnique({
          where: {
            id: dataToUpdate.assignedCoach,
            role: "coach",
            // isActive: true,
          },
        });
        if (!assignedCoach) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid coach assigned",
          });
        }
      }

      if (dataToUpdate.recordingUrl && !dataToUpdate.status) {
        dataToUpdate.status = "IN_PROGRESS";
      }

      return await ctx.db.programEnrollment.update({
        where: { id: id },
        data: dataToUpdate,
      });
    }),
});
