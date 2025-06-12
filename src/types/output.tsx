import { type AppRouter } from "@/server/api/root";
import { type inferProcedureOutput } from "@trpc/server";

export type GetAllOrder = inferProcedureOutput<AppRouter["order"]["getAll"]>;

export type GetOrderByUser = inferProcedureOutput<
  AppRouter["order"]["getByUserId"]
>;

export type GetAllProgramEnrollment = inferProcedureOutput<
  AppRouter["programEnrollment"]["getAll"]
>;

export type GetOneProgramEnrollment = inferProcedureOutput<
  AppRouter["programEnrollment"]["getOne"]
>;

export type GetProgramEnrollmentByUser = inferProcedureOutput<
  AppRouter["programEnrollment"]["getByUserId"]
>;

export type GetProgramEnrollmentByAssignedCoach = inferProcedureOutput<
  AppRouter["programEnrollment"]["getByAssignedCoach"]
>;

export type GetAllMeetingSlot = inferProcedureOutput<
  AppRouter["meetingSlot"]["getAll"]
>;

export type GetOneUserResponse = inferProcedureOutput<
  AppRouter["user"]["getOne"]
>;
