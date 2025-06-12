import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const questions = await ctx.db.question.findMany();
      return { questions };
    } catch (error) {
      console.log(error);
      return {
        message: "Something went wrong",
      };
    }
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.question.findUnique({ where: { id: input.id } });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        duration: z.number(),
        tags: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.db.question.create({
          data: {
            name: input.name,
            duration: input.duration,
            tags: input.tags,
          },
        });
      } catch (error) {
        console.log(error);
        return {
          message: "Something went wrong",
        };
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        duration: z.number(),
        tags: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...dataToUpdate } = input;
      return await ctx.db.question.update({
        where: { id: id },
        data: dataToUpdate,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.delete({ where: { id: input.id } });
    }),
});
