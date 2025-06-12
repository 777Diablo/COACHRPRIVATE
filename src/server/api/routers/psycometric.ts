import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TestType } from "@prisma/client";
import {
  calculateDISCProfile,
  DISC_QUESTIONS,
  type DISCResults,
  getDISCProfile,
} from "@/server/questions/disc";
import {
  calculatePSIResults,
  getPersonalitySignature,
  PSI_QUESTIONS,
  type PSIResults,
} from "@/server/questions/psi";
import {
  calculateRSIScores,
  RSI_QUESTIONS,
  type RSIResults,
} from "@/server/questions/rsi";
import { TRPCError } from "@trpc/server";

type Response = {
  questionId: number;
  scoreA: number;
  scoreB?: number;
};

export const psycometricRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(z.object({ test: z.nativeEnum(TestType) }))
    .query(({ ctx, input }) => {
      // check if user is logged in
      if (!ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this test",
        });
      }

      //TODO: check if user has access to this test/program

      if (input.test === "DISC") return DISC_QUESTIONS;
      if (input.test === "PSI") return PSI_QUESTIONS;
      if (input.test === "RSI") return RSI_QUESTIONS;
      return [];
    }),

  // submit tests
  submitAnswers: protectedProcedure
    .input(
      z.object({
        testType: z.nativeEnum(TestType),
        programEnrollmentId: z.string(),
        responses: z.array(
          z.object({
            questionId: z.number(),
            scoreA: z.number(),
            scoreB: z.number().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to submit this test",
        });
      }

      //   check if the user has already submitted the test

      //   based on test type calulate the scores
      let result: PSIResults | RSIResults | DISCResults | undefined;
      let outcome = "";
      let MAX_SCORE: number;
      switch (input.testType) {
        case "DISC":
          MAX_SCORE = 4;

          const DISCResponses: Record<number, number> = input.responses.reduce(
            (acc, response) => ({
              ...acc,
              [response.questionId]: response.scoreA,
            }),
            {},
          );

          result = calculateDISCProfile(DISCResponses);
          outcome = getDISCProfile(result);
          break;

        case "PSI":
          MAX_SCORE = 5;
          const PSIResponses: Record<
            number,
            { scoreA: number; scoreB: number }
          > = input.responses.reduce(
            (acc, response) => ({
              ...acc,
              [response.questionId]: {
                scoreA: response.scoreA,
                scoreB: response.scoreB ?? MAX_SCORE - response.scoreA, // Ensure the total is always 5
              },
            }),
            {},
          );

          result = calculatePSIResults(PSIResponses);
          outcome = getPersonalitySignature(result);
          break;

        case "RSI":
          MAX_SCORE = 3;
          const RSIResponses: Record<
            number,
            { scoreA: number; scoreB: number }
          > = input.responses.reduce(
            (acc, response) => ({
              ...acc,
              [response.questionId]: {
                scoreA: response.scoreA,
                scoreB: response.scoreB ?? MAX_SCORE - response.scoreA,
              },
            }),
            {},
          );

          result = calculateRSIScores(RSIResponses);
          outcome = "";
          break;

        default:
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid test type",
          });
      }

      // if result and outcome are not defined, throw an error
      if (!result) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid test type",
        });
      }

      //   save the results to the database
      await ctx.db.psycometricTestResponse.create({
        data: {
          userId,
          testType: input.testType,
          result,
          outcome,
          responses: input.responses,
          programEnrollmentId: input.programEnrollmentId,
        },
      });
    }),

  getResult: protectedProcedure
    .input(
      z.object({
        testType: z.nativeEnum(TestType),
        programEnrollmentId: z.string(),
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let userId = ctx.session.user.id;

      if (input.userId === "me") {
        userId = ctx.session.user.id;
      }

      const isAdmin = ctx.session?.user?.role === "admin";
      const isCoach = ctx.session?.user?.role === "coach";

      if (input.userId !== "me" && !isAdmin && !isCoach) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this test results",
        });
      }

      return ctx.db.psycometricTestResponse.findFirst({
        where: {
          userId,
          programEnrollmentId: input.programEnrollmentId,
          testType: input.testType,
        },
      });
    }),

  getResults: protectedProcedure
    .input(
      z.object({
        programEnrollmentId: z.string(),
        userId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let userId = ctx.session.user.id;

      if (input.userId === "me") {
        userId = ctx.session.user.id;
      }

      const isAdmin = ctx.session?.user?.role === "admin";
      const isCoach = ctx.session?.user?.role === "coach";

      if (input.userId !== "me" && !isAdmin && !isCoach) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this test results",
        });
      }

      return ctx.db.psycometricTestResponse.findMany({
        where: {
          // userId,
          programEnrollmentId: input.programEnrollmentId,
        },
        select: {
          id: true,
          testType: true,
          result: true,
          outcome: true,
          createdAt: true,
        },
      });
    }),
});
