"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Program } from "@/app/(public)/program/[slug]/types";
import { Clock, Video, CheckCircle2, Users } from "lucide-react";
// import { Program } from "@prisma/client";

interface ProgramHeroProps {
  program: Program;
}

const iconMap = {
  duration: Clock,
  format: Video,
  experience: CheckCircle2,
  audience: Users,
};

export default function ProgramHero({ program }: ProgramHeroProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="relative w-full bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 p-6 rounded-lg">
      <div className="absolute inset-0 opacity-50">
        <div className="bg-grid-white/[0.02] absolute inset-0 bg-[size:32px_32px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex min-h-screen flex-col py-16">
          <div className="flex flex-col items-center justify-between gap-12 py-16 lg:flex-row">
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate="animate"
              className="max-w-2xl flex-1 space-y-8 pt-16"
            >
              <motion.h1
                {...fadeInUp}
                className="text-5xl font-bold leading-tight dark:text-white text-black lg:text-6xl"
              >
                {program.title || "Video-Based Interview"}
              </motion.h1>

              <motion.p
                {...fadeInUp}
                className="text-xl leading-relaxed dark:text-white text-black/80"
              >
                {program.subtitle ||
                  "Prepare for your interview with personalized 1:1 feedback from industry experts. Master the art of interviewing through real-time practice sessions."}
              </motion.p>

              <motion.div
                {...fadeInUp}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <Button
                  size="lg"
                  className="rounded-lg bg-orange-500 px-8 py-6 text-lg text-white hover:bg-orange-600"
                >
                  Get Started Now
                </Button>

                {/* <Button
                  variant="outline"
                  size="lg"
                  className="rounded-lg border-2 border-white px-8 py-6 text-lg text-black hover:bg-white/10"
                >
                  Watch Demo
                </Button> */}
              </motion.div>
            </motion.div>

            {/* Right Video Player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video w-full max-w-2xl flex-1"
            >
              <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="group relative cursor-pointer">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform group-hover:scale-110">
                      <Play className="ml-1 h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
