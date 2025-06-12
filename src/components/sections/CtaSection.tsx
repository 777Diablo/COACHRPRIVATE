"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Newsletter from "./NewsLetter";
import ContactUs from "./ContactUs";
import ContactSection from "./ContactUs";

interface Metric {
  label: string;
  value: string;
}

const metrics: Metric[] = [
  { label: "Success Rate", value: "94%" },
  { label: "Happy Users", value: "10K+" },
  { label: "Expert Coaches", value: "50+" },
];

const starPositions = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  initialX: `${Math.random() * 100}%`,
  initialY: `${Math.random() * 100}%`,
  duration: Math.random() * 5 + 5,
}));

const CtaSection = () => {
  return (
    <section id="contact" className="relative overflow-hidden py-24 ">
      <motion.div
        className="bg-pri absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        // style={{ backgroundColor: 'hsla(224, 76%, 48%, 0.2)' }}
        style={{ backgroundColor: "hsla(224, 85%, 40%, 0.3)" }}
      >
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          {starPositions.map((star) => (
            <motion.div
              key={star.id}
              className="absolute"
              initial={{
                x: star.initialX,
                y: star.initialY,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Star className="text-primary-foregroundforeground h-4 w-4" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl text-center text-primary-foreground"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 inline-block"
          >
            <Sparkles className="h-12 w-12 animate-pulse" />
          </motion.div>

          <h2 className="relative mb-6 text-3xl font-bold text-foreground md:text-4xl">
            Ready to Transform Your Interview Performance?
            <motion.div
              className="absolute -inset-x-8 -inset-y-4 -z-10 rounded-lg bg-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            />
          </h2>

          <p className="mb-8 text-lg text-gray-800 opacity-90 dark:text-gray-300">
            Join thousands of successful professionals who have advanced their
            careers with CoachR
          </p>

          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <Button
              size="lg"
              variant="secondary"
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">Get Started Today</span>
              <motion.div
                className="absolute inset-0 bg-primary/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <div className="mx-auto max-w-7xl">
            <div className="mt-16">
              {/* <Newsletter /> */}
              <ContactSection />
            </div>

            {/* Success metrics */}
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-2 text-4xl font-bold text-foreground"
                  >
                    {metric.value}
                  </motion.div>
                  <div className="text-sm text-foreground opacity-80">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
