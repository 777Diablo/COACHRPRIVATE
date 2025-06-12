import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">User Privacy Policy</h1>
      <p className="mb-4">Effective Date: February 22, 2025</p>

      <p className="mb-6">
        We are committed to safeguarding your privacy and ensuring that your
        personal information is protected when you use our services. This User
        Privacy Policy outlines how we collect, use, store, and protect your
        data when you engage with our services, including Mock Interviews,
        Video-Based Interviews, Career Success Coaching, ATS-Friendly Resume,
        and Psychometrics.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
      <p className="mb-4">
        When you use our services, we collect the following types of personal
        information:
      </p>

      <h3 className="mb-2 text-xl font-semibold">
        A. Personal Information Provided by Users
      </h3>
      <ul className="mb-4 list-disc pl-6">
        <li>Full Name</li>
        <li>Contact Details (Email, Phone Number)</li>
        <li>Educational Background & Work Experience</li>
        <li>Career Goals & Job Preferences</li>
        <li>Payment & Billing Information</li>
        <li>Resume or Supporting Documents</li>
        <li>
          Psychometric Assessment Data (for Career Success Coaching & Mock
          Interview with Psychometrics)
        </li>
      </ul>

      <h3 className="mb-2 text-xl font-semibold">
        B. Automatically Collected Data
      </h3>
      <ul className="mb-6 list-disc pl-6">
        <li>Log Data (IP Address, Browser Type, Access Times)</li>
        <li>Usage Data (Interaction with our Website & Services)</li>
        <li>
          Cookies & Tracking Technologies (for website analytics and service
          improvement)
        </li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">
        How We Use Your Information
      </h2>
      <p className="mb-4">
        We use your data strictly for operational and administrative purposes,
        including:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          Service Delivery – To provide personalized interview coaching, career
          coaching, and resume-building services.
        </li>
        <li>
          Assigning Coach & Scheduling Session – To assign the most suitable
          Coach based on your profile.
        </li>
        <li>
          Feedback & Performance Tracking – To offer detailed insights and
          improvements based on your sessions.
        </li>
        <li>
          Psychometric Assessment Processing – To generate accurate personality
          and behavioural insights.
        </li>
        <li>
          Payment Processing & Order Fulfilment – To complete transactions and
          provide service access.
        </li>
        <li>
          Communication & Support – To send booking confirmations, updates,
          reminders, and respond to inquiries.
        </li>
        <li>
          Data Storage & Progress Tracking – Your session recordings and
          assessment results are stored for 6 months to help track your
          improvement if you choose to enroll in additional sessions.
        </li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
      <p className="mb-6">
        For any questions or concerns regarding your privacy, contact us at:
        <br />
        📧 Email: support@thecoachr.com
        <br />
        🌐 Website: www.thecoachr.com
      </p>

      <p className="mb-6">
        By using our services, you agree to the terms outlined in this User
        Privacy Policy.
      </p>

      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
