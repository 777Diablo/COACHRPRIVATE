"use client";

import { useSearchParams } from "next/navigation";
import { useProgramDetails } from "@/hooks/useProgramDetails";
import { HiPageLoader, HiErrorUI } from "@hidstech/common_components";

import ProgramFeatures from "./components/ProgramFeatures";
import ProgramHero from "./components/ProgramHero";
import ProgramDetails from "./components/ProgramDetails";
import ProgramTestimonials from "./components/ProgramTestimonial";
import RelatedPrograms from "./components/RelatedPrograms";
import ProgramCta from "./components/ProgramCta";
import RelatedProgramsWithPricing from "./components/RelatedPrograms";

export default function DetailsPage() {
  const searchParams = useSearchParams();
  const programId = searchParams.get("program");
  const { data, isLoading, error } = useProgramDetails(programId);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full">
        <HiPageLoader />
      </div>
    );
  }

  if (!programId || error || !data) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center py-16">
        <HiErrorUI
          errorMessage="Failed to fetch program details"
          status="404"
        />
        <button
          onClick={() => window.location.reload()}
          className="mt-8 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="flex flex-col">
        <ProgramHero program={data} />

        <section className=" ">
          <div className="flex flex-col ">
            {/* <ProgramFeatures program={data} /> */}
            {/* <ProgramFeatures program={data}  /> */}
            <ProgramFeatures program={data} />

            {/* <ProgramDetails program={data} /> */}
            <ProgramTestimonials program={data} />
            {/* <RelatedPrograms currentProgramId={data.id} /> */}
            <RelatedProgramsWithPricing currentProgramId={data.id} />
            {/* <ProgramCta program={data} /> */}
          </div>
        </section>
      </div>
    </main>
  );
}
