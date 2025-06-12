// /* eslint-disable @typescript-eslint/no-explicit-any */
// // utils/queryHandler.ts
// import { z } from "zod";
// import { Prisma, PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // Input schema for query parameters
// const queryInputSchema = z
//   .object({
//     search: z.string().optional(),
//     searchBy: z.string().optional(),
//     limit: z.number().optional(),
//     page: z.number().optional(),
//     sort: z.string().optional(),
//   })
//   .optional();

// // Define the input type for the generic query handler
// type QueryInput = z.infer<typeof queryInputSchema>;

// /**
//  * Generic query handler for Prisma models.
//  *
//  * @param model - The Prisma model delegate (e.g., prisma.user, prisma.product)
//  * @param input - The input parameters for filtering, pagination, and sorting.
//  * @returns A Promise containing the records and pagination info.
//  */

// type modelDelegate =
//   | Prisma.UserDelegate
//   | Prisma.RoleDelegate
//   | Prisma.InquiryDelegate
//   | Prisma.ProgramDelegate
//   | Prisma.OrderDelegate;

// export async function handleQuery<T extends keyof PrismaClient>(
//   modelName: T,
//   input: QueryInput,
// ) {
//   const model = prisma[modelName] as PrismaClient[T] & {
//     count: (args?: any) => Promise<number>;
//     findMany: (args?: any) => Promise<any[]>;
//   };

//   const {
//     search,
//     searchBy,
//     limit = 10,
//     page = 0,
//     sort = "-createdAt",
//   } = input ?? {};

//   // Filtering conditions
//   const where: Prisma.UserWhereInput = {
//     AND: [
//       search && searchBy
//         ? ({ [searchBy]: { contains: search, mode: "insensitive" } } as any)
//         : {},
//     ],
//   };

//   // Pagination and sorting
//   const take = limit;
//   const skip = page * take;
//   const sortOrder: Prisma.SortOrder = sort.startsWith("-") ? "desc" : "asc";
//   const sortBy = sort.startsWith("-") ? sort.slice(1) : sort;

//   // Fetch total count
//   const totalCount = await model.count({ where });

//   // Fetch data with pagination and sorting
//   const records = await model.findMany({
//     where,
//     take,
//     skip,
//     orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
//   });

//   return {
//     records,
//     totalCount,
//     totalPages: Math.ceil(totalCount / take),
//     currentPage: page,
//   };
// }
