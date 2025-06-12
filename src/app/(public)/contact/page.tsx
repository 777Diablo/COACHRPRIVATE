// import Breadcrumb from "@/components/Common/Breadcrumb";
// import Contact from "@/components/Contact";
// import CtaSection from "@/components/sections/CtaSection";

// import { type Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Contact Page | Free Next.js Template for CoachR and SaaS",
//   description: "This is Contact Page for CoachR Nextjs Template",
//   // other metadata
// };

// const ContactPage = () => {
//   return (
//     <>
//       {/* <Breadcrumb
//         pageName="Contact Page"
//         description="We’re here to support you on your journey to career success! Whether you have questions about our services, need assistance, or want to provide feedback, feel free to reach out. Our team is eager to help you every step of the way."
//       /> */}

//       {/* <Contact /> */}
//       <CtaSection/>
//     </>
//   );
// };

// export default ContactPage;
"use client";

import type { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
// import Contact from "@/components/Contact";
import CtaSection from "@/components/sections/CtaSection";
import ContactUs from "@/components/sections/ContactUs";
import { motion } from "framer-motion";
import Newsletter from "@/components/sections/NewsLetter";

const ContactPage = () => {
  return (
    <>
      {/* <div className="relative bg-gradient-to-b from-slate-50 to-white pt-32 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <Breadcrumb 
            pageName="Contact Us" 
            description="Have questions or need assistance? Our team is here to help you succeed."
          />
        </div>
      </div> */}

      <section className="relative bg-gradient-to-b from-slate-50 via-blue-50 to-white pb-20 pt-36 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800">
        {/* <div className="pointer-events-none absolute inset-0 opacity-5">
          <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-primary/20"></div>
          <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-secondary/10"></div>
        </div> */}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute bottom-0"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L1440,128L1440,320L0,320Z"
              className="fill-slate-200 dark:fill-slate-800"
            ></path>
          </svg>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb Navigation  */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="font-medium text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Home
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                    className="mx-2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Contact Us
                  </span>
                </li>
              </ol>
            </nav>

            {/* Hero Content  */}
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
                  Get in Touch <span className="text-primary">With Us</span>
                </h1>
                <p className="mb-8 max-w-lg text-lg text-gray-600 dark:text-gray-300">
                  We&apos;re here to answer your questions and help you find the
                  perfect coaching solution for your needs.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="mailto:connect@thecoachr.com,support@thecoachr.com"
                    className="flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Send Message
                  </a>
                  <div className="flex gap-2">
                    <a
                      href="tel:+918457066354"
                      className="flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Call Us
                    </a>
                    <a
                      href="https://wa.me/918457066354"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#128C7E]"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
                {/* Trust Indicators - Static */}
                <div className="mt-8 flex items-center">
                  <p className="mr-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Trusted by:
                  </p>
                  <div className="flex space-x-4">
                    <div className="h-8 w-16 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-8 w-16 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-8 w-16 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>

              {/* Hero Image  */}
              <div className="relative flex items-center justify-center">
                {/* <div className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5"></div> */}
                <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-white p-2 shadow-md dark:bg-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="h-32 w-32 text-primary opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="mb-12 lg:mb-0 lg:pr-6">
                  <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                    Get in Touch with Our Expert Team
                  </h2>
                  <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                    Whether you have questions about our coaching services,
                    pricing, or want to discuss your specific needs, we&apos;re
                    here to help.
                  </p>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-primary/10 p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      {/* <div>
                        <h3 className="text-lg font-medium text-foreground">
                          Phone
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          +91 8457066354
                        </p>
                      </div> */}
                      <div className="mt-1 space-y-1 text-gray-600 dark:text-gray-300">
                        <a
                          href="tel:+918457066354"
                          className="block transition-colors hover:text-primary"
                        >
                          +91 8457066354
                        </a>
                        <a
                          href="https://wa.me/918457066354"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block transition-colors hover:text-primary"
                        >
                          WhatsApp: 8457066354
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-primary/10 p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-foreground">
                          Email
                        </h3>
                        {/* <p className="mt-1 text-gray-600 dark:text-gray-300">
                       connect@thecoachr.com, support@thecoachr.com
                        </p> */}
                        <a
                          href="mailto:connect@thecoachr.com"
                          className="block transition-colors hover:text-primary"
                        >
                          connect@thecoachr.com
                        </a>
                        <a
                          href="mailto:support@thecoachr.com"
                          className="block transition-colors hover:text-primary"
                        >
                          support@thecoachr.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-primary/10 p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-foreground">
                          Office
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Address: Ranchi, 834009
                          <br />
                         
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  

                  <div className="flex h-full flex-col">
                    <Newsletter />
                  </div>
                </div>
              </div> */}
              
              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Professional team collaborating in a meeting"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-xl shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1332369906863!2d-122.39994368428162!3d37.78090997975824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807d007a15ed%3A0xb43af05bef2d6bad!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1645236711460!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Office Location"
            />
          </div>
        </div>
      </section> */}

      {/* <CtaSection /> */}
    </>
  );
};

export default ContactPage;
