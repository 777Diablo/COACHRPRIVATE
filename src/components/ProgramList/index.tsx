import { api, HydrateClient } from "@/trpc/server";
import React from "react";
import { List } from "./List";
import { Program } from "@prisma/client";

type ProgramWithFeatures = Program & {
  features?: Array<Record<string, any>>;
  highlights?: string[];
};

const page = async () => {
  // get program list
  const data = await api.program.getAllPublic();
  console.log("Fetched Programs Data:", data);

  const programsWithFeatures: ProgramWithFeatures[] = data.programs
    ? data.programs.map((program) => ({
        ...program,
        features: program.features
          ? program.features.map((feature) =>
              typeof feature === "object" && feature !== null
                ? feature
                : { title: String(feature) },
            )
          : [],
        highlights: program.highlights || [],
      }))
    : [];

  return (
    <HydrateClient>
      <section
        // id="pricing"
        id="programs"
        className="relative z-10 bg-slate-500 py-24 dark:bg-accent"
      >
        <div className="container mx-auto px-4">
          {/* <SectionTitle
             title="Programs"
             paragraph="Gain insights from customized feedback, real-time coaching, and assessments aligned with your goals."
             center
             width="665px"
           /> */}
          {programsWithFeatures.length > 0 ? (
            <List programs={programsWithFeatures} />
          ) : (
            <div className="container grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-3 flex items-center justify-center">
                <p className="text-center text-2xl font-semibold">
                  No program found
                </p>
              </div>
            </div>
          )}
          {/* {data.programs ? (
            <Programs programs={data.programs} />
          ) : (
            <div className="text-center text-2xl font-semibold">
              No programs found
            </div>
          )} */}
        </div>
      </section>
    </HydrateClient>
  );
};

export default page;
