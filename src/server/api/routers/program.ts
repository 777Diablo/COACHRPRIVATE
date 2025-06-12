import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { filterUndefinedProperties } from "@/utils";
import { ProgramStatus, ProgramType } from "@prisma/client";

export const programRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const programs = await ctx.db.program.findMany();
      return { programs };
    } catch (error) {
      console.log(error);
      return {
        message: "Something went wrong",
      };
    }
  }),

  getAllPublic: publicProcedure.query(async ({ ctx }) => {
    try {
      const programs = await ctx.db.program.findMany();
      return { programs };
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
      return await ctx.db.program.findUnique({ where: { id: input.id } });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        code: z.string().min(3, { message: "Code is required" }),
        type: z.nativeEnum(ProgramType),
        status: z.nativeEnum(ProgramStatus).optional(),
        basePrice: z.number(),
        discount: z.number().optional(),
        highlights: z.array(z.string()).optional().default([]),
        features: z
          .array(z.object({ title: z.string(), description: z.string() }))
          .optional()
          .default([]),
        includePsycometric: z.boolean().optional().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const totalPrice = input.discount
          ? input.basePrice - input.discount
          : input.basePrice;
        return ctx.db.program.create({
          data: {
            name: input.name,
            description: input.description,
            code: input.code,
            type: input.type,
            status: input.status,
            basePrice: input.basePrice,
            discount: input.discount,
            totalPrice: totalPrice,
            highlights: input.highlights,
            features: input.features,
            includePsycometric: input.includePsycometric,
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
        name: z.string().optional(),
        description: z.string().optional(),
        code: z.string().optional(),
        type: z.nativeEnum(ProgramType).optional(),
        status: z.nativeEnum(ProgramStatus).optional(),
        basePrice: z.number().optional(),
        discount: z.number().optional(),
        highlights: z.array(z.string()).optional(),
        features: z
          .array(z.object({ title: z.string(), description: z.string() }))
          .optional(),
        includePsycometric: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Filter out undefined fields
        const filteredData =
          filterUndefinedProperties<Partial<typeof input>>(input);
        const { id, ...dataToUpdate } = filteredData;
        const pricing: { totalPrice?: number } = {};
        if (dataToUpdate.discount && dataToUpdate.basePrice) {
          pricing.totalPrice = dataToUpdate.basePrice - dataToUpdate.discount;
        }

        return await ctx.db.program.update({
          where: { id: id },
          data: { ...dataToUpdate, ...pricing },
        });
      } catch (error) {
        console.log(error);
        return {
          message: "Something went wrong",
        };
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.program.delete({ where: { id: input.id } });
    }),
});
