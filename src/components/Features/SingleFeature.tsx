"use client";
import { motion } from "framer-motion";
import { type Feature } from "@/types";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;

  return (
    <div className="w-full">
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true }}
      >
        <motion.div
          className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary/20 bg-opacity-10 text-primary"
          whileHover={{
            scale: 1.1,
            rotate: 360,
            transition: { duration: 0.5 },
          }}
        >
          {icon}
        </motion.div>
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-center text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
      </motion.div>
    </div>
  );
};

export default SingleFeature;
