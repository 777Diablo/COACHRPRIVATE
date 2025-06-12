"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Program } from "@/app/(public)/program/[slug]/types";

// import { Program } from "@/app/program/[slug]/types";

interface ProgramCtaProps {
  program: Program;
}

// export default function ProgramCta({ program }) {
  export default function ProgramCta({ program }: ProgramCtaProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center text-primary-foreground"
        >
          <h2 className="mb-6 text-3xl font-bold">
            Ready to Transform Your Interview Skills?
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Join thousands of successful professionals who have advanced their
            careers with {program.title}
          </p>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              "Personalized Feedback",
              "Expert Review",
              "Detailed Analysis",
              "Action Plan",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <Button
              size="lg"
              variant="secondary"
              className="group relative overflow-hidden"
              onClick={() => (window.location.href = "/checkout")}
            >
              Get Started Today for {program.price}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

