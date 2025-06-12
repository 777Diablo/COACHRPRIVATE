import { motion } from "framer-motion";
import Newsletter from "./NewsLetter";
import { MapPin } from "lucide-react";

const ContactUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="bg-gradient-to-br from-neutral-900 to-gray-800 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-2"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 h-full">
          {/* Contact Us Section */}
          <motion.div
            className="flex h-full flex-col"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="flex flex-1 flex-col rounded-xl border border-neutral-700 bg-gradient-to-br from-neutral-900 to-gray-800 p-8">
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
                  Contact Us
                </h2>
                <p className="text-neutral-400">
                  Get in touch for inquiries, support, or to learn more about
                  our services.
                </p>
              </motion.div>

              <div className="flex flex-1 flex-col justify-center space-y-4 sm:space-y-6">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-4"
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
                    whileHover={{ scale: 1.1 }}
                  >
                    📧
                  </motion.div>
                  <p className="text-neutral-400">
                    <strong>Email: </strong>
                    <a
                      href="mailto:info@interviewfocus.com"
                      className="text-blue-500 hover:underline"
                    >
                      info@interviewfocus.com
                    </a>
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-4"
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
                    whileHover={{ scale: 1.1 }}
                  >
                    📞
                  </motion.div>
                  <p>
                    <strong className="text-neutral-400">Call: </strong>
                    <span className="text-blue-500">(704) 807-6887</span>
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-4"
                >
                  <motion.div
                    className="bg-yellow-100 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full"
                    whileHover={{ scale: 1.1 }}
                  >
                    ⏰
                  </motion.div>
                  <p>
                    <strong className="text-neutral-400">Hours: </strong>
                    <span className="text-blue-500">9am-9pm EST, M-F</span>
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-4"
                >
                  <div className="rounded-full bg-blue-600 p-3">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-neutral-400">
                      Charlotte, North Carolina
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-8 rounded-lg border border-neutral-700 bg-neutral-800/50 p-6"
              >
                <h3 className="mb-4 text-xl font-semibold text-white">
                  Connect With Us
                </h3>
                <p className="text-neutral-400">
                  Follow us on social media for daily career tips and industry
                  insights.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Newsletter Section - Wrapper to match Contact Us height */}
          <motion.div
            className="flex h-full flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Newsletter />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
