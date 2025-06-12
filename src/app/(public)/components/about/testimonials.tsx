"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "David Park",
    role: "Software Engineer at Google",
    content:
      "CoachR helped me prepare for my dream job interview. The personalized coaching and mock interviews were invaluable.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Lisa Chen",
    role: "Product Manager at Amazon",
    content:
      "The structured approach and detailed feedback helped me improve my interview skills significantly.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "James Wilson",
    role: "Marketing Director at Adobe",
    content:
      "Thanks to CoachR, I was able to transition into a leadership role with confidence.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const prev = () => {
    setCurrentIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          What Our Users Say
        </h2>
        <div className="max-w-4xl mx-auto relative">
          <Card className="p-8">
            <Quote className="h-12 w-12 text-primary mb-6" />
            <p className="text-xl mb-6">{testimonials[currentIndex]?.content}</p>
            <div className="flex items-center gap-4">
              <img
                src={testimonials[currentIndex]?.image}
                alt={testimonials[currentIndex]?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">
                  {testimonials[currentIndex]?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {testimonials[currentIndex]?.role}
                </p>
              </div>
            </div>
          </Card>
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}