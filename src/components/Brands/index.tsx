"use client";
import { motion } from "framer-motion";
import { type Brand } from "@/types";
import Image from "next/image";
import brandsData from "./brandsData";

const Brands = () => {
  const duplicatedBrands = [...brandsData, ...brandsData];
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  // Individual brand animation variants
  const brandVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.15,
      rotate: 3,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pt-16 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container overflow-hidden">
        <div className="-mx-4 flex">
          <div className="mb-[72px] w-full px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex flex-wrap items-center justify-center overflow-hidden rounded-lg bg-accent bg-dark px-8 py-8 shadow-lg dark:bg-gray-800/80 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
            >
              <motion.div
                className="flex"
                animate={{
                  x: [0, -1 * (duplicatedBrands.length * 160)], // Adjust based on brand width
                }}
                transition={{
                  x: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedBrands.map((brand, index) => (
                  <motion.div
                    key={`${brand.id}-${index}`}
                    className="mx-3 flex min-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:min-w-[130px] xl:mx-6 xl:min-w-[150px] 2xl:mx-8 2xl:min-w-[160px]"
                  >
                    <SingleBrand brand={brand} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="nofollow noreferrer"
      whileHover={{
        scale: 1.1,
        rotate: 2,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      className="relative h-10 w-full rounded-lg opacity-80 grayscale transition-all hover:opacity-100 hover:shadow-md hover:grayscale-0 dark:opacity-70 dark:hover:opacity-100"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="transition-transform duration-300 ease-in-out"
      />
      {/* <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-xs font-semibold text-gray-800 opacity-0 transition-all hover:text-gray-300 hover:opacity-100 dark:text-gray-200">
        {name}
      </div> */}
    </motion.a>
  );
};

export default Brands;