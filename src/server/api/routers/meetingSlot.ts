import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { TOTAL_AVAILABLE_PSYCOMETRIC_TESTS } from "@/constant";
import { Console } from "console";
import toast from "react-hot-toast";

export const meetingSlotRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        type: z.enum(["all", "available", "booked"]),
        isDistinct: z.boolean().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        coachId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {


      const coachId = ctx.session.user.id;


      if (input.coachId === "me") {
        input.coachId = coachId;
      }

      console.log("meeting slot router coach id--" + input.coachId)

      // if end date is not provided then set it to startDate at 11:59pm
      if (!input.endDate && input.startDate) {
        input.endDate = new Date(input.startDate);
        input.endDate.setHours(23, 59, 59, 0);
      }
      // console.log("meeting slot router coach id--" + input.type + " " + input.isDistinct + " " + input.startDate + " " + input.endDate + " " + input.coachId)

      //       // Log input for clarity
      // console.log("Input:", input);

      // // Build filter object step-by-step
      // const filters: any = {};

      // if (input.type === "available") {
      //   // This will be handled later by filtering, but you can choose to move it in here
      //   // filters.programEnrollmentId = null;
      //   console.log("Looking for AVAILABLE slots (will filter after DB call)");
      // }

      // if (input.type === "booked") {
      //   filters.programEnrollmentId = { not: null };
      //   console.log("Looking for BOOKED slots only");
      // }

      // if (input.startDate && input.endDate) {
      //   filters.AND = [
      //     { startTime: { gte: input.startDate } },
      //     { endTime: { lte: input.endDate } },
      //   ];
      //   console.log("Date filter:", filters.AND);
      // }

      // if (input.coachId) {
      //   filters.coachId = input.coachId;
      //   console.log("Coach ID filter:", input.coachId);
      // }

      // // Distinct flag
      // const distinctSetting = input.isDistinct ? { distinct: ["startTime"] } : {};
      // if (input.isDistinct) {
      //   console.log("Using DISTINCT on startTime");
      // }

      // Final query preview


      try {
        console.log("here input.coachid" + input.coachId);
       
        const temp = input.coachId ? await ctx.db.meetingSlot.findMany({
          where: { coachId: input.coachId }   // or handle as needed
        }):[]  ;

        // console.log("THIS IS RETURNED " + temp);

        const data = temp;



        // const data = await ctx.db.meetingSlot.findMany
        //   ({

        //     where: {
        //       // ...(input.type === "available" && { programEnrollmentId: null }),
        //       ...(input.type === "booked" && {
        //         programEnrollmentId: { not: null },
        //       }),
        //       ...(input.startDate &&
        //         input.endDate && {
        //         AND: [
        //           { startTime: { gte: input.startDate } },
        //           { endTime: { lte: input.endDate } },
        //         ],
        //       }),
        //       ...(input.coachId && { coachId: input.coachId }),
        //       // if isDistinct is true then show unique slots based on startTime
        //     },
        //     ...(input.isDistinct && { distinct: ["startTime"] }),
        //     include: {
        //       coach: {
        //         select: {
        //           name: true,
        //         },
        //       },
        //       ProgramEnrollment: {
        //         select: { user: { select: { name: true } } },
        //       },
        //     },
        //   });

        // console.log("Final Prisma Query Filters:", filters);

        console.log("DB Result Count:", data.length);


        if (input.type === "available") {
          const rturndata =data.filter((slot) => !slot.programEnrollmentId)
          console.log("what is he returning", rturndata);
          return rturndata ;
        }

        return data;
      } catch (error: unknown) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching meeting slots",
        });
      }
    }),

  // create a meeting slot
  create: protectedProcedure
    .input(
      z.object({
        startTime: z.date(),
        endTime: z.date(),
        coachId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // if coachId is me
      const coachId = ctx.session.user.id;

      if (input.coachId === "me" || !input.coachId) {
        input.coachId = coachId;
      }

      if (!input.coachId || input.coachId === "me") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "coachId is required",
        });
      }

      // check if start time is before end time
      if (input.startTime > input.endTime) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Start time must be before end time",
        });
      }

      // check for overlap for the same coach
       const existingSlots = await ctx.db.meetingSlot.findMany({
        where: {
          coachId: input.coachId,
          startTime: { lt: input.endTime },
          endTime: { gt: input.startTime },
        },
      });

      if (existingSlots.length > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Meeting slot already exists",
        });
      }


      

      const durationInMins =
        (input.endTime.getTime() - input.startTime.getTime()) / 60000;

      return await ctx.db.meetingSlot.create({
        data: {
          endTime: input.endTime,
          startTime: input.startTime,
          coachId: input.coachId,
          duration: durationInMins,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        coachId: z.string().optional(),
        programEnrollmentId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Validate input: Ensure we are not trying to update both `coachId` and `programEnrollmentId`
     
      if (input.coachId && input.programEnrollmentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot update both coach and programEnrollment",
        });
      }

      // console.log("--------------------"+input.id+"-------------"+input.programEnrollmentId)

      // Fetch the meeting slot to ensure it exists
      const meetingSlot = await ctx.db.meetingSlot.findUnique({
        where: { id: input.id },
      });

      if (!meetingSlot) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting slot not found",
        });
      }

      // if date is in the past, throw an error
      if (meetingSlot.startTime.getTime() < Date.now() && meetingSlot.endTime.getTime()<Date.now()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot update a past meeting slot",
        });
      }

      // If attempting to book a meeting slot that is already booked, throw an error
      if (input.programEnrollmentId && meetingSlot.programEnrollmentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Meeting slot is already booked",
        });
      }

      if (input.programEnrollmentId) {
        const programEnrollment = await ctx.db.programEnrollment.findUnique({
          where: { id: input.programEnrollmentId },
          include: {
            PsycometricTestResponse: {
              select: {
                id: true,
                result: true,
              },
            },
          },
        });

        if (!programEnrollment) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Program enrollment not found",
          });
        }

        if (programEnrollment.includePsycometric) {
          // check if the user has completed all the tests
          if (
            programEnrollment.PsycometricTestResponse.length <
            TOTAL_AVAILABLE_PSYCOMETRIC_TESTS
          ) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message:
                "You have not completed all the tests, please complete them first",
            });
          }
        }
      }

      // Begin transaction
      return await ctx.db.$transaction(async (transaction) => {
        // If programEnrollmentId is provided, update both programEnrollment and meetingSlot
        if (input.programEnrollmentId) {
          // Update `programEnrollment` with meeting slot details
          await transaction.programEnrollment.update({
            where: { id: input.programEnrollmentId },
            data: {
              scheduledAt: meetingSlot.startTime,
              duration: meetingSlot.duration,
              assignedCoach: meetingSlot.coachId,
            },
          });

          // Update `meetingSlot` with the new programEnrollmentId
          await transaction.meetingSlot.update({
            where: { id: input.id },
            data: {
              programEnrollmentId: input.programEnrollmentId,
            },
          });
        }

        // If coachId is provided, update the coachId in the meetingSlot
        if (input.coachId) {
          return await transaction.meetingSlot.update({
            where: { id: input.id },
            data: {
              coachId: input.coachId,
            },
          });
        }

        // If no coachId is provided, simply return the meetingSlot (unchanged in this case)
        return meetingSlot;
      });
    }),

  // delete a slot by id , if userId is null
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // delete a slot by id , if userId is null
      const meetingSlot = await ctx.db.meetingSlot.findUnique({
        where: { id: input.id },
      });

      if (!meetingSlot) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting slot not found",
        });
      }

      if (meetingSlot.programEnrollmentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Meeting slot is already booked",
        });
      }

      if (
        meetingSlot.coachId !== ctx.session.user.id &&
        ctx.session.user.role !== "admin"
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to delete this meeting slot",
        });
      }
      return await ctx.db.meetingSlot.delete({ where: { id: input.id } });
    }),
});
