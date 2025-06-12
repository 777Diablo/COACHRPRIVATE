"use client";

import { ArrowDown } from "lucide-react";
import { HiButton } from "@hidstech/common_components";

export function AboutHero() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("mission-vision");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // <section className="relative h-[90vh] flex items-center justify-center">
    //   <div
    //     className="absolute inset-0 bg-cover bg-center"
    //     style={{
    //       backgroundImage:
    //         "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
    //     }}
    //   >
    //     <div className="absolute inset-0 bg-black/60" />
    //   </div>
    //   <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
    //     <h1 className="text-5xl md:text-6xl font-bold mb-6">About CoachR</h1>
    //     <p className="text-xl md:text-2xl mb-8 text-gray-200">
    //       Empowering Aspiring Professionals to Ace Their Interviews and Shape Their
    //       Careers
    //     </p>
    //     <Button
    //       onClick={scrollToNextSection}
    //       variant="secondary"
    //       size="lg"
    //       className="group"
    //     >
    //       Learn More About Us
    //       <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
    //     </Button>
    //   </div>
    // </section>

    <section className="relative min-h-[600px] w-full overflow-hidden bg-[url(/images/home/bg-03.jpg)] bg-cover bg-fixed bg-[center_center] bg-no-repeat pt-[200px]">
      <div className="hero-overlay">
        <div className="container text-center">
          <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap justify-center">
            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-10/12 lg:w-9/12 xl:w-10/12">
              <div
                className="hero-12-txt color--white wow fadeInUp"
                style={{ visibility: "visible", animationName: "fadeInUp" }}
              >
                <h2 className="s-62 w-700 xsm:text-[2.125rem] xsm:px-[6%] xsm:py-0 font-Jakarta xsm:leading-[1.35] mb-[24px] px-[3%] py-0 text-[3.875rem] font-bold leading-[1.25] sm:text-[2.625rem] sm:leading-[1.35] md:text-[3.38235rem] lg:p-0 lg:text-[3.625rem]">
                  {/* About CoachR */}
                  Empowering Growth Through
                  <span className="mt-2 block text-primary ">
                    Expert Coaching
                  </span>
                </h2>
                <p className="s-22 xsm:text-[1.3125rem] xsm:px-[4%] xsm:py-0 mb-[36px] px-[5%] py-0 text-[1.375rem] sm:text-[1.4375rem] md:mb-[26px] md:p-0 md:text-[1.397058rem] lg:mb-[32px] lg:p-0 lg:text-[1.25rem]">
                  Empowering Aspiring Professionals to Ace Their Interviews and
                  Shape Their Careers
                </p>

                <HiButton
                  onClick={scrollToNextSection}
                  variant="secondary"
                  size="lg"
                  className="btn btn--theme hover--tra-white !rounded-[4px]"
                  endIcon={
                    <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  }
                >
                  Learn More About Us
                  {/* <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /> */}
                </HiButton>

                {/* <p className="p-sm btn-txt ico-15 !p-0 m-[20px_0_0_0] lg:mt-[15px] lg:mb-0 lg:mx-0 md:mt-[13px] md:mb-0 md:mx-0 xsm:mt-[18px] xsm:mb-0 sm:mt-[15px] sm:mb-0 sm:mx-0">
                <span className="flaticon-check relative right-[2px] top-[0.5px]" /> No credit card needed, free 14-day trial
              </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
