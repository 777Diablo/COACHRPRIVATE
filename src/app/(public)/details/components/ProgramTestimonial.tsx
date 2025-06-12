"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { type Program as PrismaProgram } from "@prisma/client"; 


interface Program extends PrismaProgram {
  testimonials?: Array<{
    name: string;
    role: string;
    content: string;
    rating: number;
    company: string;
  }>;
}

interface ProgramTestimonialsProps {
  program: Program;
}


const placeholderTestimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    content:
      "The video review helped me identify and improve my communication style. Landed my dream job!",
    rating: 5,
    company: "Google",
  },
  {
    name: "Michael Rodriguez",
    role: "Product Manager",
    content:
      "Detailed feedback and actionable suggestions made all the difference in my interviews.",
    rating: 5,
    company: "Meta",
  },
  {
    name: "Emily Kim",
    role: "UX Designer",
    content:
      "The personalized feedback was invaluable. Highly recommend this program!",
    rating: 5,
    company: "Apple",
  },
];

export default function ProgramTestimonials({
  program,
}: ProgramTestimonialsProps) {
  // Use program testimonials or fallback to placeholders
  const testimonials = program.testimonials ?? placeholderTestimonials;

  return (
    <section className="bg-accent/5 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold dark:text-gray-100">Success Stories</h2>
          <p className="mx-auto max-w-2xl text-muted- dark:text-gray-300">
            See how others have benefited from {program.name || "this program"}.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg">
                <CardContent className="space-y-4 p-6">
                  <div className="mb-2 flex">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
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
