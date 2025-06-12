import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import hashPassword from "@/utils/hashPassword";
import { ROLE } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          searchBy: z.string().optional(),
          limit: z.number().optional(),
          page: z.number().optional(),
          sort: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const {
        search,
        searchBy,
        limit = 10,
        page = 0,
        sort = "-createdAt",
      } = input ?? {};

      const where = {
        AND: [
          // Apply search filtering
          search && searchBy
            ? { [searchBy]: { contains: search, mode: "insensitive" } }
            : {},
          // { deletedAt: null },
        ],
      };

      // Convert limit and page to numbers
      const take = limit;
      const skip = page * take;
      // const sortOrder = sort.startsWith("-") ? "desc" : "asc";
      // const sortBy = sort.slice(1);

      // Find total count for pagination
      const totalCount = await ctx.db.user.count({ where });

      // Fetch users with filtering, pagination, and sorting applied
      const users = await ctx.db.user.findMany({
        where,
        take,
        skip,
        // orderBy: { [sortBy]: sortOrder },
      });

      return {
        users,
        totalCount,
        totalPages: Math.ceil(totalCount / take),
        currentPage: page,
      };
    }),
  getAllStaff: protectedProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          searchBy: z.string().optional(),
          limit: z.number().optional(),
          page: z.number().optional(),
          sort: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const {
        search,
        searchBy,
        limit = 10,
        page = 0,
        // sort = "-createdAt",
      } = input ?? {};

      // Convert limit and page to numbers
      const take = limit;
      const skip = page * take;
      // const sortOrder = sort.startsWith("-") ? "desc" : "asc";
      // const sortBy = sort.slice(1);

      // Find total count for pagination
      const totalCount = await ctx.db.user.count({
        where: {
          AND: [
            search && searchBy
              ? { [searchBy]: { contains: search, mode: "insensitive" } }
              : {},
            { role: "admin" },
            // { deletedAt: null },
          ],
        },
      });

      // Fetch users with filtering, pagination, and sorting applied
      const users = await ctx.db.user.findMany({
        where: {
          AND: [
            search && searchBy
              ? { [searchBy]: { contains: search, mode: "insensitive" } }
              : {},
            { role: "admin" },
            // { deletedAt: null },
          ],
        },
        take,
        skip,
        // orderBy: { [sortBy]: sortOrder },
      });

      return {
        users,
        totalCount,
        totalPages: Math.ceil(totalCount / take),
        currentPage: page,
      };
    }),

  getUsersByRole: protectedProcedure
    .input(
      z.object({
        roles: z.array(z.nativeEnum(ROLE)),
        search: z.string().optional(),
        searchBy: z.string().optional(),
        limit: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const {
        roles,
        search,
        searchBy,
        limit = 10,
        page = 0,
        // sort = "-createdAt",
      } = input ?? {};

      // Convert limit and page to numbers
      const take = limit;
      const skip = page * take;
      // const sortOrder = sort.startsWith("-") ? "desc" : "asc";
      // const sortBy = sort.slice(1);

      // Find total count for pagination
      const totalCount = await ctx.db.user.count({
        where: {
          AND: [
            search && searchBy
              ? { [searchBy]: { contains: search, mode: "insensitive" } }
              : {},
            { role: { in: roles } },
          ],
        },
      });

      // Fetch users with filtering, pagination, and sorting applied
      const users = await ctx.db.user.findMany({
        where: {
          AND: [
            search && searchBy
              ? { [searchBy]: { contains: search, mode: "insensitive" } }
              : {},
            { role: { in: roles } },
            // {
            // OR: [{ deletedAt: null }, { deletedAt: { equals: undefined } }],
            // },
          ],
        },
        take,
        skip,
        // orderBy: { [sortBy]: sortOrder },
      });

      return {
        users,
        totalCount,
        totalPages: Math.ceil(totalCount / take),
        currentPage: page,
      };
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      if (input.id === "me") {
        input.id = userId;
      }

      return await ctx.db.user.findUnique({ where: { id: input.id } });
    }),

  createCustomer: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(6),
        mobile: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await hashPassword(input.password);
      try {
        await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            mobile: input.mobile,
            password: hashedPassword,
          },
        });

        return {
          message: "User created successfully",
        };
      } catch (e) {
        return {
          message: "User creation failed",
        };
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(6),
        mobile: z.string(),
        role: z.nativeEnum(ROLE),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await hashPassword(input.password);
      try {
        await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            mobile: input.mobile,
            password: hashedPassword,
            role: input.role,
          },
        });

        return {
          message: `${input.role as string} created successfully`,
        };
      } catch (e) {
        return {
          message: "User creation failed",
        };
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        mobile: z.string().optional(),
        role: z.nativeEnum(ROLE).optional(),
        isActive: z.boolean().optional(),
        // New fields
        image: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
        linkedin: z.string().optional(),
        highestQualification: z.string().optional(),
        college: z.string().optional(),
        passingYear: z.string().optional(),
        specialization: z.string().optional(),
        currentJobRole: z.string().optional(),
        yearsOfExperience: z.number().optional(),
        industry: z.string().optional(),
        currentEmployer: z.string().optional(),
        preferredJobRole: z.string().optional(),
        targetCompanies: z.string().optional(),
        targetLocations: z.string().optional(),
        certifications: z
          .array(
            z.object({
              name: z.string(),
              issuer: z.string(),
              issueDate: z.date(),
              expiration: z.date().optional(),
            }),
          )
          .optional(),
        projects: z
          .array(z.object({ title: z.string(), description: z.string() }))
          .optional(), // JSON array
        resume: z.string().optional(),
        previousRoles: z.string().optional(),
        careerObjectives: z.string().optional(),
        // new fields - 9th march, 2025
        dateOfBirth: z.date().optional(),
        gender: z.string().optional(),
        currentSalary: z.number().optional(),
        currentCTC: z.number().optional(),
        expectedCTC: z.number().optional(),
        functionalExpertise: z.string().optional(),
        expertiseDetails: z.string().optional(),
        improvementAreas: z.string().optional(),
        strengths: z.string().optional(),
        weaknesses: z.string().optional(),
        careerChallenges: z.string().optional(),
        interviewChallenges: z.string().optional(),
        resumeInstructions: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...dataToUpdate } = input;

      // isActive and role can only be updated by admin
      if (dataToUpdate.isActive || dataToUpdate.role) {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({ where: { id: userId } });

        if (user?.role !== "admin") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized to update this user",
          });
        }
      }

      return await ctx.db.user.update({
        where: { id: id },
        data: dataToUpdate,
      });
    }),

  // update user Password
  updatePassword: protectedProcedure
    .input(
      z.object({
        oldPassword: z.string().min(6),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const user = await ctx.db.user.findUnique({
        where: { id: userId },
      });

      if (!user?.password) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not change password",
        });
      }

      // match password
      const isPasswordMatch = await bcrypt.compare(
        input.oldPassword,
        user.password,
      );

      if (!isPasswordMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      }

      const hashedPassword = await hashPassword(input.password);
      return await ctx.db.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
    }),
  forgotPassword: publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      // Optional: avoid giving hints about valid emails

      console.log("not found")
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const hashedPassword = await hashPassword(input.password);
    console.log("sdlalkdjasdlk  "+hashPassword)

    await ctx.db.user.update({
      where: { email: input.email },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: "Password has been reset successfully",
    };
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // only admin can delete user
      const userId = ctx.session.user.id;
      const user = await ctx.db.user.findUnique({ where: { id: userId } });

      if (user?.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to delete this user",
        });
      }

      return await ctx.db.user.delete({ where: { id: input.id } });

      // soft delete
      // return await ctx.db.user.update({
      //   where: { id: input.id },
      //   data: { deletedAt: new Date() },
      // });
    }),
});
