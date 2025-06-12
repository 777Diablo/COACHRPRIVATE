import { type Metadata } from "next";
import ProgramHero from "@/components/program/ProgramHero";
// import ProgramFeatures from "@/components/program/ProgramFeatures";

import { getAllProgramSlugs, getProgramBySlug } from "@/lib/program";
import { notFound } from "next/navigation";
import WhyChooseThisProgram from "@/components/program/WhyChooseThisProgram";

export const generateStaticParams = () =>  getAllProgramSlugs().map((slug) => ({ slug }));

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const program = getProgramBySlug(params.slug);
  if (!program) return { title: "Program Not Found | CoachR" };

  return {
    title: `${program.title} | CoachR`,
    description: program.description,
  };
};

const ProgramPage = ({ params }: { params: { slug: string } }) => {
  const program = getProgramBySlug(params.slug);
  if (!program) notFound();

  return (
    <main className="min-h-screen bg-background">
      <ProgramHero program={program} />
      {/* <ProgramFeatures program={program} /> */}
      {program.whyChooseAttributes && (
        <WhyChooseThisProgram attributes={program.whyChooseAttributes} />
      )}
    </main>
  );
};

export default ProgramPage;