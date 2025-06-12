import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Free Next.js Template for CoachR and SaaS",
  description: "This is Contact Page for CoachR Nextjs Template",
  // other metadata
};

const ProductsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="We’re here to support you on your journey to career success! Whether you have questions about our services, need assistance, or want to provide feedback, feel free to reach out. Our team is eager to help you every step of the way."
      />

      <Contact />
    </>
  );
};

export default ProductsPage;