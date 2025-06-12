"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import * as Icons from "lucide-react";
import { coreFeatures } from "@/app/(public)/program/[slug]/data/core-features";
import { useRouter } from "next/navigation";

const FeatureCard = ({
  feature,
}: {
  feature: (typeof coreFeatures)[number];
}) => {
  // const Icon = Icons[feature.icon as keyof typeof Icons];
  const Icon = Icons[feature.icon as keyof typeof Icons] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card
        className={`group relative h-full overflow-hidden border border-neutral-700 bg-neutral-900 transition-all duration-500 hover:shadow-xl ${feature.cardHoverClass} `}
      >
        <div className="h-full">
          <CardHeader>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.iconBgClass} group-hover:bg-primary/20`}
            >
              {Icon && <Icon className={`h-6 w-6 text-white`} />}
            </motion.div>
            <CardTitle
              className={`mb-2 text-white transition-colors duration-300 ${feature.textColorClass} `}
            >
              {feature.title}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {feature.description}
            </CardDescription>
          </CardHeader>

          <div className="max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-[500px]">
            <CardContent>
              {/* <motion.div
            initial={{ height: 0, opacity: 0 }}
            whileHover={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
          > */}
              <ul className="mt-4 space-y-2">
                {feature.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    // transition={{ delay: i * 0.1 }}
                    className="flex items-center text-muted-foreground"
                  >
                    <span
                      className={`mr-2 h-1.5 w-1.5 rounded-full ${feature.pointerColorClass}`}
                    />
                    {detail}
                  </motion.li>
                ))}
              </ul>
              <Button
                variant="ghost"
                className={`mt-4 w-full bg-pink-400 transition-colors duration-300`}
                onClick={() => router.push("/signup")}
              >
                <span className="hover:text-black dark:hover:text-white">
                  Get Started
                </span>
              </Button>
              {/* </motion.div> */}
            </CardContent>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-primary"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

export default function CoreFeatures() {
  return (
    <section id="features" className="bg-neutral-800 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white">Core Features</h2>
          <p className="mx-auto max-w-3xl text-gray-400">
            {/* Comprehensive tools and services designed to enhance your interview
            preparation journey. */}
            Comprehensive tools and services to polish your skills with mock interviews, psychometric tests, and real-time feedback.  
            Enhancing your interview preparation journey with each step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {coreFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
        {/* <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="transform rounded-xl border border-neutral-700 bg-neutral-900 p-6 transition-transform hover:-translate-y-2 hover:shadow-lg">
            <div className="mb-4 flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 shadow-md">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white">
                Real-Time Feedback
              </h4>
            </div>
            <p className="leading-relaxed text-neutral-400">
              Get instant feedback on your performance to improve your interview
              skills quickly.
            </p>
          </div>

          <div className="transform rounded-xl border border-neutral-700 bg-neutral-900 p-6 transition-transform hover:-translate-y-2 hover:shadow-lg">
            <div className="mb-4 flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 shadow-md">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white">
                Exclusive Resources
              </h4>
            </div>
            <p className="leading-relaxed text-neutral-400">
            Access premium study material and prep guides for all industries.

            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
