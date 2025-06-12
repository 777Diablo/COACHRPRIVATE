"use client";

import React from "react";
import faqData from "@/data/faq.json";
import featuresData from "@/data/features.json";
import whyChooseData from "@/data/whyChoose.json";
import serveData from "@/data/serve.json";
import Header from "@/components/Header";
import Link from "next/link";
import { HiButton } from "@hidstech/common_components";
import type * as Icons from "lucide-react";
import IconWithShape from "@/components/IconWithShape";
import Footer from "@/components/Footer";
import Image from "next/image";
import TrustSignals from "@/components/Hero/TrustSignal";

const page = () => {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative z-[3] w-full bg-[#7f44e1] bg-[url(/images/home/hero-1.jpg)] bg-cover bg-fixed bg-[center_center] bg-no-repeat pb-[100px] pt-[130px] md:py-[70px] lg:pb-[80px] lg:pt-[120px]">
        <div className="container">
          <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap items-center">
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-6/12 lg:w-6/12 xl:w-6/12">
              <div
                className="hero-1-txt color--white wow fadeInRight sm:px-[3%] sm:py-0"
                style={{ visibility: "visible", animationName: "fadeInRight" }}
              >
                <h1 className="s-58 w-700 xsm:text-[2.0625rem] font-Jakarta xsm:leading-[1.35] xsm:mb-[18px] mb-[28px] text-[3.625rem] font-bold leading-[1.25] sm:mb-[15px] sm:text-[2.5rem] sm:leading-[1.35] md:mb-[18px] md:text-[3.08823rem] lg:mb-[24px] lg:text-[3.2rem]">
                  Maximize your Potential with Coaching by HR Experts
                </h1>

                <h2 className="text-xl font-semibold text-muted-foreground md:text-2xl">
                  YOUR CAREER, OUR MISSION
                </h2>
                <p className="p-xl xsm:mb-[25px] mb-[32px] pr-[2%] sm:mb-[25px] md:mb-[24px] md:pr-0 lg:mb-[28px]">
                  Accelerate your career with expert mock interviews,
                  personalized feedback, and coaching to secure your dream job
                </p>
                {/* <Link
                  href="/try-for-free"
                  className="btn btn--theme hover--tra-white !rounded-[4px]"
                >
                  Try for free
                </Link> */}
                {/* <p className="p-sm btn-txt ico-15 !p-0 m-[20px_0_0_0] lg:mt-[15px] lg:mb-0 lg:mx-0 md:mt-[13px] md:mb-0 md:mx-0 xsm:mt-[18px] xsm:mb-0 sm:mt-[15px] sm:mb-0 sm:mx-0">
                  <span className="flaticon-check relative right-[2px] top-[0.5px]" /> No credit card needed, free 14-day
                  trial
                </p> */}

                {/* <div className="flex flex-col gap-4 sm:flex-row space-y-4">
                  <Link
                    className="btn btn--theme hover--tra-white !rounded-[4px]"
                    href="/try-for-free"
                  >
                    Try For Free
                    
                  </Link>
                </div> */}

                <div className="mt-4">
                  <TrustSignals />
                </div>

                <div className="text-center sm:text-left">
                  {/* <p className="text-sm text-muted-foreground">
          Trusted by 10,000+ professionals • Rated 4.8/5 by our users
        </p> */}
                  <div className="mt-4 flex flex-wrap gap-4">
                    <span className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
                      Expert Review
                    </span>
                    <span className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
                      Coaching & Feedback
                    </span>
                    <span className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
                      Performance Analytics
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-6/12 lg:w-6/12 xl:w-6/12">
              <div
                className="hero-1-img wow fadeInLeft"
                style={{ visibility: "visible", animationName: "fadeInLeft" }}
              >
                <img
                  className="img-fluid"
                  src="/images/home/hero-1-img.png"
                  alt="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="division bg-background py-[100px] md:py-[70px] lg:py-[80px]">
        <div className="container">
          <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap justify-center">
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-10/12 lg:w-9/12 xl:w-9/12">
              <div className="section-title mb--70 mb-[70px] text-center md:mb-[50px] lg:mb-[60px]">
                <h2 className="mb-2 text-4xl font-bold text-gray-800 dark:text-gray-100">
                  {featuresData?.title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {featuresData?.subtitle}
                </p>
              </div>
            </div>
          </div>
          <div className="fbox-wrapper text-center">
            <div className="row-cols-1 row-cols-md-2 row-cols-lg-4 mx-[calc(-0.5*_1.5rem)] flex flex-wrap">
              {featuresData?.features?.map((feature) => {
                return (
                  <div
                    key={feature?.id}
                    className="col w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-6/12 lg:w-4/12 xl:w-4/12"
                  >
                    <div
                      className={`fb-${feature?.id} wow fadeInUp ${feature?.id <= 2 ? "md:mb-[70px]" : ""}`}
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                      }}
                    >
                      {feature?.icon ? (
                        <IconWithShape
                          iconName={feature?.icon as keyof typeof Icons}
                          size={60}
                        />
                      ) : null}
                      <div className="fbox-txt">
                        <h6 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                          {feature?.title}
                        </h6>
                        <p className="mb-0 text-gray-700 dark:text-gray-300">
                          {feature?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}

      <hr className="divider m-0 h-px w-full bg-transparent bg-[linear-gradient(90deg,rgba(206,211,246,0)_0,#bbb_38%,#bbb_64%,rgba(206,211,246,0)_99%)] opacity-40 [border:none]" />

      {/* About Section */}
      {/* <section className="division bg-background pt-[100px] md:pt-[70px] lg:pt-[80px]">
        <div className="container">
          <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap items-center">
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-6/12 lg:w-6/12 xl:w-6/12">
              <div
                className="img-block left-column wow fadeInRight xsm:m-[0_2%_35px] mr-[30px] text-center sm:mx-[3%] md:mr-0 lg:mr-[5px]"
                style={{ visibility: "visible", animationName: "fadeInRight" }}
              >
                <img
                  className="img-fluid"
                  src="/images/home/img-03.png"
                  alt="content-image"
                />
              </div>
            </div>
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-6/12 lg:w-6/12 xl:w-6/12">
              <div
                className="txt-block right-column wow fadeInLeft"
                style={{ visibility: "visible", animationName: "fadeInLeft" }}
              >
                <div className="txt-box mb-[40px]">
                  <h5 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Tailored Learning Pathways
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Your journey, your way. From mock interviews to
                    skill-building exercises, our programs adapt to your
                    individual goals and needs.
                  </p>
                </div>
                <div className="txt-box mb-[40px]">
                  <h5 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Dedicated Coaching Support
                  </h5>
                  <p>
                    One-on-one coaching by industry experts ensures you&apos;re
                    not just prepared but confident.
                  </p>
                </div>
                <div className="txt-box mb-0">
                  <h5 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Real-World Interview Simulations
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Practice with AI-driven mock interviews and real-time
                    feedback. Simulate real-world scenarios to enhance your
                    problem-solving skills and interview confidence.
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Services Section */}
      <section className="bg-slate-100 py-24 dark:bg-slate-900 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 md:w-10/12 lg:w-9/12 xl:w-9/12">
              <div className="mb-20 text-center md:mb-12 lg:mb-16">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                  {serveData?.title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {serveData?.subtitle}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="text-center">
            <div className="-mx-4 flex flex-wrap">
              {serveData?.services?.map((service) => (
                <div key={service?.id} className="mb-10 w-full px-4 md:w-4/12">
                  <div className="transform transition duration-500 hover:scale-105">
                    <div className="xsm:mx-3 mx-2 mb-14 rounded-t-xl bg-gray-50 pt-10 dark:bg-gray-700 sm:mx-[10%] sm:mb-12 sm:pt-10 md:mb-10 md:pt-7 lg:mb-12 lg:pt-8">
                      <img
                        className="xsm:max-h-[185px] mb-[-25px] inline-block max-h-[175px] w-auto sm:max-h-[220px] md:max-h-32 lg:max-h-40"
                        src={service?.image?.light}
                        alt={service?.title}
                      />
                    </div>
                    <div className="text-center">
                      <h6 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        {service?.title}
                      </h6>
                      <p className="text-gray-700 dark:text-gray-300">
                        {service?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <div className="text-center">
            <div className="-mx-4 flex flex-wrap">
              {serveData?.services?.map((service) => (
                <div key={service?.id} className="mb-10 w-full px-4 md:w-4/12">
                  <div className="transform transition duration-500 hover:scale-105">
                    <div className="mb-6 flex items-center justify-center">
                      <Image
                        className="min-h-[244px] overflow-hidden rounded bg-slate-800 object-contain"
                        src={service?.image?.light}
                        alt={service?.title}
                        width={500}
                        height={250}
                      />
                    </div>

                    <div className="text-center">
                      <h6 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        {service?.title}
                      </h6>
                      <p className="text-gray-700 dark:text-gray-300">
                        {service?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      {/* <section className="ct-02 content-section division bg-background py-[100px] md:py-[70px] lg:py-[80px]">
        <div className="container">
          <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap items-center">
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-6/12 lg:w-6/12 xl:w-6/12">
              <div
                className="img-block left-column wow fadeInRight xsm:m-[0_2%_35px] mr-[30px] text-center sm:mx-[3%] md:mr-0 lg:mr-[5px]"
                style={{ visibility: "visible", animationName: "fadeInRight" }}
              >
                <Image
                  className="img-fluid"
                  src="/images/home/img-09.png"
                  alt="content-image"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-6/12 lg:w-6/12 xl:w-6/12">
              <div
                className="txt-block right-column wow fadeInLeft"
                style={{ visibility: "visible", animationName: "fadeInLeft" }}
              >
                <div className="cbox-2 process-step group relative flex items-stretch justify-start [flex-flow:row_wrap]">
                  <div className="ico-wrap xsm:mr-4 relative mr-[1.625rem] md:mr-[1.15rem] lg:mr-[1.1rem]">
                    <div className="cbox-2-ico bg--theme color--white xsm:w-[2.3rem] xsm:h-[2.3rem] xsm:text-[1.15rem] xsm:leading-[2.05rem] relative h-[2.625rem] w-[2.625rem] rounded-[100%] text-center !text-[1.1875rem] font-medium leading-[2.375rem] [border:2px_solid_transparent] [transition:all_450ms_ease-in-out] group-hover:scale-110 group-hover:bg-transparent md:h-[2.15rem] md:w-[2.15rem] md:text-[1.125rem] md:leading-[1.85rem] lg:h-[2.35rem] lg:w-[2.35rem] lg:text-[1.135rem] lg:leading-8">
                      1
                    </div>
                    <span className="cbox-2-line xsm:h-[calc(100%_-_74px)] absolute bottom-5 left-2/4 h-[calc(100%_-_90px)] w-[2px] -translate-x-2/4 bg-[#e4e4e4] md:h-[calc(100%_-_74px)] lg:h-[calc(100%_-_74px)]" />
                  </div>
                  <div className="cbox-2-txt xsm:mb-[25px] mb-[35px] max-w-full flex-1 overflow-hidden md:mb-[20px] lg:mb-[25px]">
                    <h5 className="mb-2 text-2xl font-bold text-gray-600 dark:text-gray-100">
                      Sign Up in 30 Seconds
                    </h5>
                    <p className="mb-0 !leading-[1.6666]">
                      Join CoachR with a quick and easy signup process. Create
                      your profile and unlock access to expert-curated
                      resources, mock interviews, and personalized learning
                      paths.
                    </p>
                  </div>
                </div>
                <div className="cbox-2 process-step group relative flex items-stretch justify-start [flex-flow:row_wrap]">
                  <div className="ico-wrap xsm:mr-4 relative mr-[1.625rem] md:mr-[1.15rem] lg:mr-[1.1rem]">
                    <div className="cbox-2-ico bg--theme color--white xsm:w-[2.3rem] xsm:h-[2.3rem] xsm:text-[1.15rem] xsm:leading-[2.05rem] relative h-[2.625rem] w-[2.625rem] rounded-[100%] text-center !text-[1.1875rem] font-medium leading-[2.375rem] [border:2px_solid_transparent] [transition:all_450ms_ease-in-out] group-hover:scale-110 group-hover:bg-transparent md:h-[2.15rem] md:w-[2.15rem] md:text-[1.125rem] md:leading-[1.85rem] lg:h-[2.35rem] lg:w-[2.35rem] lg:text-[1.135rem] lg:leading-8">
                      2
                    </div>
                    <span className="cbox-2-line xsm:h-[calc(100%_-_74px)] absolute bottom-5 left-2/4 h-[calc(100%_-_90px)] w-[2px] -translate-x-2/4 bg-[#e4e4e4] md:h-[calc(100%_-_74px)] lg:h-[calc(100%_-_74px)]" />
                  </div>
                  <div className="cbox-2-txt xsm:mb-[25px] mb-[35px] max-w-full flex-1 overflow-hidden md:mb-[20px] lg:mb-[25px]">
                    <h5 className="mb-2 text-2xl font-bold text-gray-600 dark:text-gray-300">
                      Personalized Learning Dashboard
                    </h5>
                    <p className="mb-0 !leading-[1.6666]">
                      Access a dashboard tailored to your needs. Track progress,
                      receive AI-driven interview tips, and get real-time
                      feedback to improve your skills efficiently.
                    </p>
                  </div>
                </div>
                <div className="cbox-2 process-step group relative flex items-stretch justify-start [flex-flow:row_wrap]">
                  <div className="ico-wrap xsm:mr-4 relative mr-[1.625rem] md:mr-[1.15rem] lg:mr-[1.1rem]">
                    <div className="cbox-2-ico bg--theme color--white xsm:w-[2.3rem] xsm:h-[2.3rem] xsm:text-[1.15rem] xsm:leading-[2.05rem] relative h-[2.625rem] w-[2.625rem] rounded-[100%] text-center !text-[1.1875rem] font-medium leading-[2.375rem] [border:2px_solid_transparent] [transition:all_450ms_ease-in-out] group-hover:scale-110 group-hover:bg-transparent md:h-[2.15rem] md:w-[2.15rem] md:text-[1.125rem] md:leading-[1.85rem] lg:h-[2.35rem] lg:w-[2.35rem] lg:text-[1.135rem] lg:leading-8">
                      3
                    </div>
                  </div>
                  <div className="cbox-2-txt xsm:mb-[25px] mb-[35px] max-w-full flex-1 overflow-hidden md:mb-[20px] lg:mb-[25px]">
                    <h5 className="mb-2 text-2xl font-bold text-gray-600 dark:text-gray-300">
                      Master Interviews with Confidence
                    </h5>
                    <p className="mb-0 !leading-[1.6666]">
                      Practice with real-world coding challenges, behavioral
                      coaching, and expert guidance. Gain the confidence to
                      excel in technical and HR interviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Why Choose CoachR Section */}
      {/* <section className="shape--bg shape--white-500 division xsm:after:h-[64%] xsm:after:top-[32.35%] bg-slate-100 pt-[100px] after:absolute after:left-[52%] after:top-[21%] after:z-[-1] after:h-[72%] after:w-[48%] after:bg-[#f2f4f8] after:content-[''] dark:bg-slate-900 md:pt-[70px] md:after:left-[48%] md:after:top-[19%] md:after:h-3/4 md:after:w-[52%] lg:pt-[80px] lg:after:left-2/4 lg:after:top-[18%] lg:after:h-[76%] lg:after:w-6/12">
        <div className="container">
          <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap items-center">
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-5/12 lg:w-5/12 xl:w-5/12">
              <div
                className="txt-block left-column wow fadeInRight"
                style={{ visibility: "visible", animationName: "fadeInRight" }}
              >
                <span className="text-sm font-bold uppercase leading-none tracking-[0.5px]">
                  One-Stop Solution
                </span>
                <h2 className="my-4 text-4xl font-bold text-gray-800 dark:text-gray-100">
                  Why Choose CoachR?
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We provide comprehensive interview preparation solutions that
                  set you up for success
                </p>
              </div>
            </div>

            
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-7/12 lg:w-7/12 xl:w-7/12">
              <div
                className="fbox-12-wrapper wow fadeInLeft pl-[45px] md:pl-0 lg:pl-[30px]"
                style={{ visibility: "visible", animationName: "fadeInLeft" }}
              >
                <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap">
                  {whyChooseData?.features?.map((feature, index) => (
                    <div
                      key={feature?.id}
                      className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-6/12 lg:w-6/12 xl:w-6/12"
                    >
                      <div
                        id={`fb-12-${feature?.id}`}
                        className={`fbox-12 block-shadow rounded-[12px] bg-gray-50 dark:bg-gray-700 ${
                          index !== featuresData?.features.length - 1
                            ? "mb--30 mb-[30px]"
                            : ""
                        } xsm:px-[30px] xsm:py-[35px] flex h-[280px] flex-col px-[35px] py-[32px] shadow-lg sm:px-[50px] sm:py-[40px] md:px-[18px] md:py-[22px] lg:p-[30px]`}
                      >
                        {feature?.icon ? (
                          <div className="mb-4">
                            <IconWithShape
                              iconName={feature?.icon as keyof typeof Icons}
                              size={50}
                            />
                          </div>
                        ) : null}
                        <div className="fbox-txt flex flex-1 flex-col">
                          <h5 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800 dark:text-gray-100">
                            {feature?.title}
                          </h5>
                          <p className="mb-0 line-clamp-5 overflow-ellipsis text-gray-700 dark:text-gray-300">
                            {feature?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="shape--bg shape--white-500 division bg-slate-100 pt-[100px] after:absolute after:left-[52%] after:top-[21%] after:z-[-1] after:h-[72%] after:w-[48%] after:bg-[#f2f4f8] after:content-[''] dark:bg-slate-900 md:pt-[70px] md:after:left-[48%] md:after:top-[19%] md:after:h-3/4 md:after:w-[52%] lg:pt-[80px] lg:after:left-2/4 lg:after:top-[18%] lg:after:h-[76%] lg:after:w-6/12">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase leading-none tracking-[0.5px]">
              One-Stop Solution
            </span>
            <h2 className="my-4 text-4xl font-bold text-gray-800 dark:text-gray-100">
              Why Choose CoachR?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-700 dark:text-gray-300">
              We provide comprehensive interview preparation solutions that set
              you up for success
            </p>
          </div>

          {/* Feature Cards */}
          <div
            className="fbox-12-wrapper wow fadeInLeft"
            style={{ visibility: "visible", animationName: "fadeInLeft" }}
          >
            <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap justify-center">
              {whyChooseData?.features?.map((feature, index) => (
                <div
                  key={feature?.id}
                  className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] sm:w-6/12 md:w-4/12 lg:w-4/12 xl:w-3/12"
                >
                  <div
                    id={`fb-12-${feature?.id}`}
                    className={`fbox-12 block-shadow rounded-[12px] bg-gray-50 dark:bg-gray-700 ${
                      index !== featuresData?.features.length - 1
                        ? "mb--30 mb-[30px]"
                        : ""
                    } flex h-[320px] flex-col px-[35px] py-[32px] shadow-lg sm:px-[24px] sm:py-[30px] md:px-[18px] md:py-[22px] lg:p-[30px]`}
                  >
                    {feature?.icon ? (
                      <div className="mb-4">
                        <IconWithShape
                          iconName={feature?.icon as keyof typeof Icons}
                          size={50}
                        />
                      </div>
                    ) : null}
                    <div className="fbox-txt flex flex-1 flex-col">
                      <h5 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800 dark:text-gray-100">
                        {feature?.title}
                      </h5>
                      <p className="mb-0 line-clamp-5 overflow-ellipsis text-gray-700 dark:text-gray-300">
                        {feature?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {/* <section className="faqs-section bg-background pt-[100px] md:pt-[70px] lg:pt-[80px]">
        <div className="container">
          <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap justify-center">
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-10/12 lg:w-9/12 xl:w-9/12">
              <div className="section-title mb--70 xsm:mb-[40px] mb-[70px] text-center sm:mb-[40px] md:mb-[45px] lg:mb-[55px]">
                <h2 className="my-4 text-4xl font-bold text-gray-800 dark:text-gray-100">
                  {faqData?.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {faqData?.subtitle}
                </p>
              </div>
            </div>
          </div>
          <div className="faqs-3-questions">
            <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap">
              <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] lg:w-6/12 xl:w-6/12">
                <div className="questions-holder px-[10px] py-0 md:p-0 lg:p-0">
                  {faqData?.faqs
                    ?.slice(0, Math.ceil((faqData.faqs.length || 0) / 2))
                    .map((faq) => (
                      <div
                        key={faq?.id}
                        className="question mb--35 wow fadeInUp mb-[35px]"
                        style={{
                          visibility: "visible",
                          animationName: "fadeInUp",
                        }}
                      >
                        <h5 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                          <span className="mr-[5px]">{faq?.id}.</span>
                          {faq?.question}
                        </h5>
                        <p className="text-gray-700 dark:text-gray-300">
                          {faq?.answer.includes(
                            "intervieweecoach@thecoachr.com",
                          ) ? (
                            <span>
                              {
                                faq?.answer.split(
                                  "intervieweecoach@thecoachr.com",
                                )[0]
                              }
                              <a
                                href="mailto:intervieweecoach@thecoachr.com"
                                style={{ color: "blue" }}
                              >
                                intervieweecoach@thecoachr.com
                              </a>
                              {
                                faq?.answer.split(
                                  "intervieweecoach@thecoachr.com",
                                )[1]
                              }
                            </span>
                          ) : (
                            faq?.answer
                          )}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] lg:w-6/12 xl:w-6/12">
                {faqData?.faqs
                  ?.slice(Math.ceil((faqData.faqs.length || 0) / 2))
                  .map((faq) => (
                    <div
                      key={faq?.id}
                      className="question mb--35 wow fadeInUp mb-[35px]"
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                      }}
                    >
                      <h5 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        <span className="mr-[5px]">{faq?.id}.</span>
                        {faq?.question}
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        {faq?.answer.includes(
                          "intervieweecoach@thecoachr.com",
                        ) ? (
                          <span>
                            {
                              faq?.answer.split(
                                "intervieweecoach@thecoachr.com",
                              )[0]
                            }
                            <a
                              href="mailto:intervieweecoach@thecoachr.com"
                              style={{ color: "blue" }}
                            >
                              intervieweecoach@thecoachr.com
                            </a>
                            {
                              faq?.answer.split(
                                "intervieweecoach@thecoachr.com",
                              )[1]
                            }
                          </span>
                        ) : (
                          faq?.answer
                        )}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap">
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)]">
              <div className="more-questions mt-[40px] text-center md:mt-[30px] lg:mt-[30px]">
                <div className="inline-block rounded-[100px] bg-slate-200 p-4 dark:bg-slate-700">
                  <p className="p-lg mb-0 mr-4 leading-none sm:text-[1.125rem] md:text-[1.125rem] lg:text-[1.125rem]">
                    {faqData?.cta?.text}
                    <Link
                      href={faqData?.cta?.link}
                      className="color--theme font-medium underline hover:!text-[#353f4f] hover:underline"
                    >
                      {faqData?.cta?.linkText}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer Banner Section */}
      <section
        id="banner-3"
        className="bg-background pt-[100px] md:pt-[70px] lg:pt-[80px]"
      >
        <div className="container">
          <div className="relative overflow-hidden rounded-[16px] bg-[url(/images/home/bg-03.jpg)] bg-cover !bg-fixed bg-[center_center] bg-no-repeat text-center sm:my-0 sm:ml-[-15px] sm:mr-[-15px]">
            <div className="banner-overlay xsm:pt-[60px] xsm:pb-[70px] xsm:px-[30px] h-full w-full px-[20%] pb-[85px] pt-[75px] sm:px-[60px] sm:pb-[65px] sm:pt-[55px] md:px-[20%] md:pb-[55px] md:pt-[45px] lg:px-[22%] lg:pb-[70px] lg:pt-[60px]">
              <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap">
                <div className="col w-full max-w-full flex-[1_0_0%] px-[calc(0.5*_1.5rem)]">
                  <div className="banner-3-txt color--white">
                    <h2 className="s-48 w-700 xsm:text-[1.9375rem] font-Jakarta xsm:leading-[1.35] text-[3rem] font-bold leading-[1.25] sm:text-[2.25rem] sm:leading-[1.35] md:text-[2.5rem] lg:text-[2.75rem]">
                      Ace Your Next Interview with Confidence
                    </h2>
                    <p className="p-xl xsm:mt-3 xsm:text-[1.125rem] xsm:mb-[20px] mb-[25px] mt-[20px] sm:mb-[20px] sm:mt-3 md:mb-[20px] md:mt-[10px] lg:mb-[25px] lg:mt-[15px]">
                      From mock interviews to expert feedback, CoachR equips you
                      with everything you need to succeed
                    </p>
                    <Link
                      href="/signup"
                      className="btn btn--theme hover--tra-white !rounded-[4px]"
                    >
                      Get started
                    </Link>
                    {/* <p className="p-sm btn-txt ico-15 !m-[20px_0_0_0] lg:mt-[15px] lg:mb-0 lg:mx-0 md:mt-[13px] md:mb-0 md:mx-0 xsm:mt-[18px] xsm:mb-0 sm:mt-[15px] sm:mb-0 sm:mx-0">
                      <span className="flaticon-check relative right-[2px] top-[0.5px]" /> Free for 14 days, no credit
                      card required.
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default page;
