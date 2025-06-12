import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import CtaSection from "@/components/sections/CtaSection";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Free Next.js Template for CoachR and SaaS",
  description: "This is Contact Page for CoachR Nextjs Template",
  // other metadata
};

const BlogsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="We’re here to support you on your journey to career success! Whether you have questions about our services, need assistance, or want to provide feedback, feel free to reach out. Our team is eager to help you every step of the way."
      />

      <CtaSection />
    </>
  );
};

export default BlogsPage;