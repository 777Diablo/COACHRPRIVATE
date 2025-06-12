"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign } from "lucide-react";
import type { Program } from "@/app/(public)/program/[slug]/types";
import { useRouter } from "next/navigation";
import { getRelatedPrograms } from "@/lib/program";

interface RelatedProgramsProps {
  currentProgram: Program;
}

export default function RelatedPrograms({
  currentProgram,
}: RelatedProgramsProps) {
  const router = useRouter();
  const relatedPrograms = getRelatedPrograms(currentProgram.slug);

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">Related Programs</h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Explore other programs to enhance your interview preparation
          </p>

          {/* Centered Pricing Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Button
              variant="default"
              className="group rounded-full bg-primary/90 px-6 py-3 shadow-lg transition-all duration-300 hover:bg-primary hover:shadow-xl"
              onClick={() => router.push("/pricing")}
            >
              <DollarSign className="mr-2 h-5 w-5 text-white group-hover:animate-pulse" />
              <span className="font-semibold text-white">See Our Prices</span>
              <ArrowRight className="ml-2 h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {relatedPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg">
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-xl font-semibold">{program.title}</h3>
                  <p className="text-muted-foreground">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {program.price}
                    </span>
                    <Button
                      variant="outline"
                      className="group"
                      onClick={() => router.push(`/program/${program.slug}`)}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
