"use client";

import React from "react";
import { motion } from "framer-motion";
import NewsLatterBox from "./NewsLatterBox";

const Contact = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      id="contact"
      className="overflow-hidden py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <motion.div
            variants={itemVariants}
            className="w-full px-4 lg:w-7/12 xl:w-8/12"
          >
            <motion.div
              variants={itemVariants}
              className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <motion.h2
                variants={itemVariants}
                className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl"
              >
                Need Help? Open a Ticket
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mb-12 text-base font-medium text-body-color"
              >
                Our support team will get back to you ASAP via email.
              </motion.p>
              <motion.form variants={itemVariants}>
                <div className="-mx-4 flex flex-wrap">
                  {["name", "email", "message"].map((field) => (
                    <motion.div
                      key={field}
                      variants={itemVariants}
                      className={`w-full px-4 ${field === "message" ? "" : "md:w-1/2"}`}
                    >
                      <div className="mb-8">
                        <motion.label
                          variants={itemVariants}
                          htmlFor={field}
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          {field === "name"
                            ? "Your Name"
                            : field === "email"
                              ? "Your Email"
                              : "Your Message"}
                        </motion.label>
                        {field !== "message" ? (
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type={field}
                            placeholder={`Enter your ${field}`}
                            className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                          />
                        ) : (
                          <motion.textarea
                            whileFocus={{ scale: 1.02 }}
                            name={field}
                            rows={5}
                            placeholder="Enter your Message"
                            className="w-full resize-none rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div className="w-full px-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                    >
                      Submit Ticket
                    </motion.button>
                  </div>
                </div>
              </motion.form>
            </motion.div>
          </motion.div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
