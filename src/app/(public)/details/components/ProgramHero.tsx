"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Clock, Video, CheckCircle2, Users } from "lucide-react";
import { type Program as PrismaProgram } from "@prisma/client";

interface ProgramHeroProps {
  program: PrismaProgram;
}

const iconMap = {
  duration: Clock,
  format: Video,
  experience: CheckCircle2,
  audience: Users,
} as const;

const programStats = [
  { icon: "duration", label: "Duration", value: "1 Hour" },
  { icon: "format", label: "Format", value: "Video" },
  { icon: "experience", label: "Experience", value: "All Levels" },
  { icon: "audience", label: "Audience", value: "Professionals" },
] as const;

export default function ProgramHero({ program }: ProgramHeroProps) {
  return (
    <section className="relative min-h-[90vh] w-full bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="bg-grid-pattern absolute inset-0" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex min-h-[90vh] flex-col justify-center py-16">
          <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">

            <div className="max-w-2xl flex-1 space-y-10">
              <h1 className="text-4xl font-bold leading-tight  text-primary sm:text-5xl lg:text-6xl">
                {program.name}
              </h1>

              <p className="text-lg leading-relaxed text-gray-700 dark:text-muted-foreground/90 sm:text-xl">
                {program.description}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Button
                  size="lg"
                  className="rounded-lg bg-primary px-8 py-6 text-lg font-medium text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() =>
                    (window.location.href = `/checkout?program=${program.id}`)
                  }
                >
                  Get Started Now
                </Button>

                {/* Price Information */}
                <div className="text-xl text-gray-800 dark:text-primary-foreground">
                  <span className="font-bold">
                    ₹{program.totalPrice.toLocaleString()}
                  </span>
                  {program.discount && program.discount > 0 && (
                    <span className="text-primary ml-2">
                      ({program.discount}% off)
                    </span>
                  )}
                </div>
              </div>
            </div>

            
            <div className="relative aspect-video w-full max-w-2xl flex-1 shadow-4xl bg-primary/10">
              <div className="group h-full w-full overflow-hidden rounded-2xl border border-border/30 bg-background/20 backdrop-blur-sm transition-all hover:border-border/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/40 backdrop-blur-sm">
                      <Play className="ml-1 h-8 w-8 text-primary-foreground" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Program Stats - Commented out in original code */}
          {/* <div
            className="mx-auto mt-16 w-full max-w-4xl rounded-xl border border-border/30 bg-background/20 p-8 backdrop-blur-sm"
          >
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {programStats.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div key={item.label} className="space-y-3 text-center">
                    <div className="flex justify-center text-primary">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-medium text-muted-foreground/60">
                      {item.label}
                    </div>
                    <div className="font-semibold text-foreground">
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
