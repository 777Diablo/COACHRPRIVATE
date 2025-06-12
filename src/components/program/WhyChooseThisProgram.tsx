

"use client";

import React from "react";
import { CheckCircle2, Award, Target, LucideProps } from "lucide-react";
import { motion } from "framer-motion";

type ProgramAttribute = {
  id: string;
  title: string;
  description: string;
  icon?: React.ComponentType<LucideProps>;
  imageSrc?: string;
};

type WhyChooseProgramProps = {
  attributes: ProgramAttribute[];
};

const defaultIcons = [CheckCircle2, Award, Target];

const WhyChooseThisProgram: React.FC<WhyChooseProgramProps> = ({
  attributes,
}) => {
  if (!attributes || attributes.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        {/*  title section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-primary dark:text-primary-foreground">
            Why Choose This Program?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground dark:text-muted-foreground/80">
            Discover the distinctive features that make our program exceptional
            and transformative.
          </p>
        </motion.div>

        {/* Main content section */}
        <div className="relative flex flex-col lg:flex-row lg:gap-12">
          <div className="w-full lg:w-1/2">
            <div className="space-y-12">
              {attributes.map((attr, index) => {
                const IconComponent =
                  attr.icon ?? defaultIcons[index % defaultIcons.length];

                return (
                  <motion.div
                    key={attr.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 flex-shrink-0">
                        {IconComponent && (
                          <IconComponent
                            className="h-6 w-6 text-primary dark:text-primary-foreground"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          {attr.title}
                        </h3>
                        <p className="text-muted-foreground dark:text-muted-foreground/80">
                          {attr.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            className="flex w-full lg:absolute lg:right-0 lg:h-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="aspect-[16/10] w-full max-w-xl overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800">
                <img
                  src="/api/placeholder/800/500"
                  alt="Program features illustration"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseThisProgram;
