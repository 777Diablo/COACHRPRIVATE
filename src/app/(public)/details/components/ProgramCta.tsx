"use cient";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { type Program as PrismaProgram } from "@prisma/client";

interface ProgramCtaProps {
  program: PrismaProgram;
}

export default function ProgramCta({ program }: ProgramCtaProps) {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const features = [
    "Personalized Feedback",
    "Expert Review",
    "Detailed Analysis",
    "Action Plan",
  ];

  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-emerald-800 py-24">
      <div className="absolute inset-0 opacity-50">
        <div className="bg-grid-white/[0.02] absolute inset-0 bg-[size:32px_32px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            {...fadeInUp}
            className="text-4xl font-bold text-white md:text-5xl"
          >
            Ready to Transform Your Career?
          </motion.h2>

          <motion.p {...fadeInUp} className="mt-6 text-xl text-white/90">
            Join thousands of successful professionals who have advanced their
            careers with {program.name}
          </motion.p>

          <motion.div
            {...fadeInUp}
            className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-2"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-2 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
              >
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium text-white">
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="mt-12 space-y-4">
            <Button
              size="lg"
              className="w-full rounded-lg bg-orange-500 px-8 py-6 text-lg text-white hover:bg-orange-600 md:w-auto"
              onClick={() =>
                (window.location.href = `/checkout?program=${program.id}`)
              }
            >
              Get Started Today for ₹{program.totalPrice.toLocaleString()}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {program.discount && program.discount > 0 && (
              <p className="text-sm text-emerald-400">
                Save {program.discount}% - Limited Time Offer!
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
