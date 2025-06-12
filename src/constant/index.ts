import { TestType, type ProgramType } from "@prisma/client";

export const programType: Record<ProgramType, string> = {
  interview: "Interview",
  video_based_interview: "Video Based Interview",
  video_call_interview: "Video Call Interview",
} as const;

// available psycometric tests
export const PSYCOMETRIC_TESTS: Record<TestType, string> = {
  PSI: "Personality Signature Index (PSI)",
  RSI: "Role Selection Index (RSI)",
  DISC: "Discreet Communication Index (DISC)",
} as const;

export const TOTAL_AVAILABLE_PSYCOMETRIC_TESTS =
  Object.keys(PSYCOMETRIC_TESTS).length;
