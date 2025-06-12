import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { type Metadata } from "next";
import { AboutHero } from "../components/about/hero";

import { Team } from "../components/about/team";
import { Testimonials } from "../components/about/testimonials";

import OurStory from "../components/about/OurStory";
import MissionVision from "../components/about/mission-vision";
import CoreValues from "../components/about/core-values";
import Purpose from "../components/about/purpose";
import CallToAction from "../components/about/cta";

export const metadata: Metadata = {
  title: "About Page | CoachR",
  description: "This is About Page for CoachR",
};

const AboutPage = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("mission-vision");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // <>
    //   <Breadcrumb
    //     pageName="About Page"
    //     description="At CoachR, we are dedicated to empowering aspiring professionals, students, and career seekers to thrive in today’s competitive job market. Our mission is to equip you with the skills and insights necessary for success through engaging workshops, personalized coaching, and interactive discussions."
    //   />
    //   <AboutSectionOne />
    //   <AboutSectionTwo />
    // </>

    <main className="min-h-screen">
      <AboutHero />
      <MissionVision />
      {/* <OurStory /> */}
      <CoreValues />
      <Purpose />
      {/* <Team /> */}
      {/* <Testimonials /> */}
      {/* <CallToAction /> */}
    </main>
  );
};

export default AboutPage;
