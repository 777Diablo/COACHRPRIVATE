"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import TrustSignals from "./TrustSignal";
// import TrustSignals from './TrustSignals';

export default function HeroContent() {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-6 text-left">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* <h1 className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent md:text-3xl lg:text-4xl">
          Master your Interviews under the guidance of seasoned HR
          professionals, your Interviewee Coach!
        </h1> */}
        <h1 className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-primary md:text-3xl lg:text-4xl">
          Master your Interviews under the guidance of seasoned HR
          professionals, your Interviewee Coach!
        </h1>
        <h2 className="text-xl font-semibold text-muted-foreground md:text-2xl">
          YOUR CAREER, OUR MISSION
        </h2>
        <p className="text-lg text-muted-foreground md:text-xl">
          Empowering your success with mock interviews, detailed feedback, and
          psychometric tests along with coaching guidance from HR experts to
          land your dream job.
        </p>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <Button
          size="lg"
          className="group relative overflow-hidden bg-cyan-400 text-primary-foreground hover:bg-primary/90 dark:hidden"
          onClick={() => router.push("/try-for-free")}
        >
          Try For Free
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="group hidden dark:flex"
          onClick={() => router.push("/try-for-free")}
        >
          Try For Free
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <TrustSignals />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center sm:text-left"
      >
        {/* <p className="text-sm text-muted-foreground">
          Trusted by 10,000+ professionals • Rated 4.8/5 by our users
        </p> */}
        <div className="mt-2 flex flex-wrap gap-4">
          <span className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Expert Review
          </span>
          <span className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Live Feedback
          </span>
          <span className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Performance Analytics
          </span>
        </div>
      </motion.div>
    </div>
  );
}
