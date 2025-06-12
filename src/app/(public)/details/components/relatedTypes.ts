import { type Program } from "@prisma/client";

export type ProgramWithFeatures = Program & {
  features?: Array<Record<string, any>>;
  highlights?: string[];
};
