"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, CheckCircle2, BookOpen, Check } from "lucide-react";
import { type Program as PrismaProgram } from "@prisma/client";


interface FeatureItem {
  title: string;
  description: string;
}

interface ProgramFeaturesProps {
  program: PrismaProgram;
}

export default function ProgramFeatures({ program }: ProgramFeaturesProps) {
  
  const featureIcons = {
    "Mock Interview": Video,
    "Feedback from Expert": CheckCircle2,
    "Access for 15 Days": BookOpen,
    "Discounted Retake Option": CheckCircle2,
    // Default icon for other features
    "default": CheckCircle2
  };

  
  const bgColors = [
    "bg-blue-500/10",
    "bg-emerald-500/10", 
    "bg-orange-500/10",
    "bg-purple-500/10",
    "bg-pink-500/10",
    "bg-indigo-500/10"
  ];

  // Parse features from the program data
  const features: FeatureItem[] = React.useMemo(() => {
    try {
      // Check if features exists and is an array
      if (!program.features || !Array.isArray(program.features)) {
        return [];
      }
      
      // Type-safe extraction of features
      return program.features
        .filter(Boolean)
        .map(feature => {
          // Safely access potentially undefined properties
          let title = 'Feature';
          let description = '';
          
          if (feature && typeof feature === 'object' && !Array.isArray(feature)) {
            // Use any typing here just for property access
            const featureObj = feature as any;
            
            if (typeof featureObj.title === 'string') {
              title = featureObj.title;
            }
            
            if (typeof featureObj.description === 'string') {
              description = featureObj.description;
            }
          }
          
          return { title, description };
        });
    } catch (error) {
      console.error("Error parsing features:", error);
      return [];
    }
  }, [program.features]);

  
  const programBenefits = React.useMemo(() => {
    if (program.highlights && Array.isArray(program.highlights)) {
      return program.highlights.filter(h => typeof h === "string");
    }
    return [
      "Pre-session preparation materials",
      "60-minute mock interview session",
      "Detailed feedback and improvement plan",
    ];
  }, [program.highlights]);
  

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-background dark:bg-slate-900 py-24">
      <div className="container ">
        <h2
          // initial={{ opacity: 0, y: 20 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          className="mb-16 text-4xl font-bold dark:text-gray-100"
        >
          What You Get
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Feature Cards */}
          <div
            // variants={containerAnimation}
            // initial="hidden"
            // whileInView="show"
            // viewport={{ once: true }}
            className="space-y-4"
          >
            {features.length > 0 ? (
              features.map((feature, index) => {
                // Determine the icon to use based on feature title
                const IconComponent = featureIcons[feature.title as keyof typeof featureIcons] || featureIcons.default;
                // Cycle through background colors
                const bgColor = bgColors[index % bgColors.length];
                
                return (
                  <div
                    key={index}
                    // variants={itemAnimation}
                    // whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div
                            className={`h-12 w-12 flex-shrink-0 ${bgColor} flex items-center justify-center rounded-lg`}
                          >
                            <IconComponent className="h-6 w-6 text-foreground" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold transition-colors group-hover:text-primary dark:text-gray-200">
                              {feature.title}
                            </h3>
                            <p className="leading-relaxed text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                No features available for this program.
              </div>
            )}
          </div>

          {/* Right Column - Program Overview */}
          <div
            // initial={{ opacity: 0, x: 20 }}
            // whileInView={{ opacity: 1, x: 0 }}
            // viewport={{ once: true }}
            className="rounded-xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-2xl font-bold dark:text-gray-100">Program Overview</h3>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              {program.longDescription || program.description ||
                "Our program is designed to help you excel in your upcoming interviews through personalized coaching and feedback."}
            </p>

            <div className="mb-8 space-y-4">
              {programBenefits.map((benefit, index) => (
                <div
                  key={index}
                  // initial={{ opacity: 0, x: -20 }}
                  // whileInView={{ opacity: 1, x: 0 }}
                  // viewport={{ once: true }}
                  // transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="text-emerald-500">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Program Price</span>
                <span className="text-2xl font-bold">
                  ₹{typeof program.totalPrice === 'number' ? program.totalPrice.toLocaleString() : "N/A"}
                </span>
              </div>
              <Button
                className="w-full bg-primary text-white "
                size="lg"
                onClick={() =>
                  (window.location.href = `/checkout?program=${program.id}`)
                }
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}