import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { programRouter } from "./routers/program";
import { inquiryRouter } from "./routers/inquiry";
import { orderRouter } from "./routers/order";
import { programEnrollmentRouter } from "./routers/programEnrollment";
import { meetingSlotRouter } from "./routers/meetingSlot";
import { questionRouter } from "./routers/question";
import { psycometricRouter } from "./routers/psycometric";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  program: programRouter,
  programFeature: programRouter,
  inquiry: inquiryRouter,
  order: orderRouter,
  programEnrollment: programEnrollmentRouter,
  meetingSlot: meetingSlotRouter,
  question: questionRouter,
  psycometric: psycometricRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
