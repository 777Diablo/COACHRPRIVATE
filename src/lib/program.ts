
import { programs } from "@/app/(public)/program/[slug]/data/programs";
import { type Program } from "@/app/(public)/program/[slug]/types";

export function getProgramBySlug(slug: string): Program | undefined {
  return programs[slug];
}

export function getAllProgramSlugs(): string[] {
  return Object.keys(programs);
}

export function getRelatedPrograms(currentSlug: string, limit = 2): Program[] {
  return Object.values(programs)
    .filter(program => program.slug !== currentSlug)
    .slice(0, limit);
}

export function getFeaturedPrograms(limit = 3): Program[] {
  return Object.values(programs)
    .filter(program => program.featured)
    .slice(0, limit);
}
