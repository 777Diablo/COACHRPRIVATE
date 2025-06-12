"use client";

import Image from "next/image";
import { Button } from "@hidstech/common_components/components/ui/button.js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@hidstech/common_components/components/ui/card.js";
import { type Program } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProgramCard({
  program,
  onViewDetails,
}: {
  program: Program & { features?: Array<Record<string, any>> };
  onViewDetails: () => void;
}) {
  return (
    <Card className="relative h-full transform rounded-xl border border-neutral-700 bg-neutral-800 transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="text-center">
        <Image
          src={"https://picsum.photos/200"}
          alt={program.name}
          width={300}
          height={200}
          className="h-48 w-full rounded-t-lg object-cover"
        />
        <div className="text-center">
          <h3 className="mb-2 text-xl font-bold text-white">{program.name}</h3>
          <p className="mb-2 text-3xl font-bold text-white">
            &#x20B9; {program.totalPrice || "N/A"}
          </p>
          <p className="mb-4 text-muted-foreground">
            {program.description || "No description available."}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {program.highlights?.length > 0 ? (
              program.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                >
                  {highlight}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                No highlights available.
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {program.features && program.features.length > 0 ? (
            program.features.map((feature, idx) => {
              // Safely extract the title, ensuring it's a string
              const featureTitle =
                feature &&
                typeof feature === "object" &&
                "title" in feature &&
                typeof feature.title === "string"
                  ? feature.title
                  : `Feature ${idx + 1}`;

              return (
                <li
                  key={idx}
                  className="flex items-center text-muted-foreground"
                >
                  <ArrowRight className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                  {featureTitle}
                </li>
              );
            })
          ) : (
            <li className="text-sm text-muted-foreground">
              No features available.
            </li>
          )}
        </ul>
      </CardContent>

      <CardFooter className="relative flex flex-col items-center space-y-2">
        <div className="w-full">
          <Button
            className="group relative w-full overflow-hidden"
            onClick={() => onViewDetails()}
          >
            <span className="relative z-10">Learn More</span>
            <div className="absolute inset-0 bg-primary/20" />
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* <Link
          href="/try-for-free"
          className="cursor-pointer text-sm text-primary hover:underline"
          prefetch 
        >
          Try for free
        </Link> */}
      </CardFooter>
    </Card>
  );
}
