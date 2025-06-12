import { ProgramWithFeatures } from "./relatedTypes";
import { type Program } from "@prisma/client";

export const transformProgram = (program: Program): ProgramWithFeatures => ({
  ...program,
  features: program.features
    ? program.features.map((feature) =>
        typeof feature === "object" && feature !== null
          ? feature
          : { title: String(feature) },
      )
    : [],
  highlights: program.highlights || [],
});
