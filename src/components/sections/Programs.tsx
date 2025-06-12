"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Program, ProgramFeature } from "@/app/(public)/program/[slug]/types";
import { programs } from "@/app/(public)/program/[slug]/data/programs";
import * as Icons from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProgramCard = ({ program }: { program: Program }) => {
  const Icon = Icons[program.icon as keyof typeof Icons] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card
        className={`relative h-full ${
          program.colorScheme?.[0]?.hoverBorderColor ?? ""
        } transform rounded-xl border border-neutral-700 bg-neutral-800 transition-all duration-300 hover:shadow-2xl ${
          program.featured ? "scale-105 border-primary shadow-lg" : ""
        }`}
      >
        <div
          className={`absolute inset-0 ${
            program.colorScheme?.[0]?.gradient ?? ""
          }`}
        ></div>
        {program.featured && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground"
          >
            Most Popular
          </motion.div>
        )}
        <CardHeader>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`h-16 w-16 rounded-2xl ${
              program.colorScheme?.[0]?.bgColor ?? ""
            } mx-auto mb-4 flex items-center justify-center`}
          >
            {Icon && <Icon className={`h-6 w-6 text-white`} />}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h3 className="mb-2 text-xl font-bold text-white">
              {program.title}
            </h3>
            <p className="mb-2 text-3xl font-bold text-white">
              {program.price}
            </p>
            <p className="mb-4 text-muted-foreground">{program.description}</p>
            <div className="flex justify-center gap-2">
              {program.highlights?.map((highlight, i) => (
                <span
                  key={i}
                  className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {program.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center text-muted-foreground"
              >
                <ArrowRight className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                {feature.title}
              </motion.li>
            ))}
          </ul>
        </CardContent>
        

        <CardFooter className="flex flex-col items-center space-y-2">
          <Button
            className="group relative w-full overflow-hidden"
            variant={program.featured ? "default" : "outline"}
            onClick={() => router.push(`/program/${program.slug}`)}
          >
            <span className="relative z-10">Learn More</span>
            <motion.div
              className="absolute inset-0 bg-primary/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <span className="text-sm text-muted-foreground">Try for free</span>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function Programs() {
  const programsArray = Object.values(programs);

  // React Slick settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of visible slides
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet view
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Mobile view
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  return (
    <section id="programs" className="bg-slate-500 py-24 dark:bg-accent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
            Choose Your Program
          </h2>
          <p className="mx-auto max-w-2xl text-foreground">
            Select the perfect program that matches your career goals and
            preparation needs
          </p>
        </motion.div>

        {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-3"> */}
        <Slider {...sliderSettings}>
          {programsArray.map((program) => (
            <div key={program.id} className="px-2">
              {" "}
              {/* Add padding for better spacing */}
              <ProgramCard key={program.id} program={program} />
            </div>
          ))}
        </Slider>
        {/* </div> */}
      </div>
    </section>
  );
}
