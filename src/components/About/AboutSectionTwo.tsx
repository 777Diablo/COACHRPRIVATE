"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutSectionTwo = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="-mx-4 flex flex-wrap items-center"
        >
          <div className="w-full px-4 lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
            >
              <Image
                src="/images/about/about-image-2.svg"
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <Image
                src="/images/about/about-image-2-dark.svg"
                alt="about image"
                fill
                className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
              />
            </motion.div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <motion.div variants={containerVariants} className="max-w-[470px]">
              {[
                {
                  title: "Tailored Learning Pathways",
                  description:
                    "Your journey, your way. From mock interviews to skill-building exercises, our programs adapt to your individual goals and needs.",
                },
                {
                  title: "Dedicated Coaching Support",
                  description:
                    "One-on-one coaching by industry experts ensures you're not just prepared but confident.",
                },
                {
                  title: "Cutting-Edge Technology",
                  description:
                    "Built with Next.js for optimal performance, our platform ensures a seamless user experience, providing resources and tools at your fingertips.",
                },
              ].map((section, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="mb-9 last:mb-1"
                >
                  <motion.h3
                    whileHover={{ scale: 1.02 }}
                    className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                  >
                    {section.title}
                  </motion.h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    {section.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
