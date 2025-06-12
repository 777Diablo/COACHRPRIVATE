"use client";

import { RocketIcon as RocketLaunch, Target } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-neutral-100 py-20 dark:bg-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Mission */}
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-neutral-900">
            <div className="mb-6 flex items-center">
              <div className="rounded-lg bg-primary/10 p-3 dark:bg-primary/10">
                <RocketLaunch className="h-8 w-8 text-primary dark:text-primary" />
              </div>
              <h2 className="ml-4 text-2xl font-bold text-neutral-900 dark:text-white">
                Our Mission
              </h2>
            </div>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
              Empowering individuals to unlock their potential and build
              confidence at every career stage through expert coaching,
              personalized feedback, and actionable career strategies.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-neutral-900">
            <div className="mb-6 flex items-center">
              <div className="rounded-lg bg-primary/10 p-3 dark:bg-primary/10">
                <Target className="h-8 w-8 text-primary dark:text-primary" />
              </div>
              <h2 className="ml-4 text-2xl font-bold text-neutral-900 dark:text-white">
                Our Vision
              </h2>
            </div>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
              To be the leading career success platform, equipping Professionals
              and Freshers with the skills, confidence, and tools to master
              interviews and achieve their career goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
