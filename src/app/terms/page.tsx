import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-4">Effective Date: February 22, 2025</p>

      <p className="mb-6">
        Welcome to The CoacHR People Advisory Services Private Limited! By using
        our website and services, including Mock Interviews, Video-Based
        Interviews, Career Success Coaching, ATS-Friendly Resume Building, and
        other career enhancement services, you agree to comply with and be bound
        by the following Terms of Service. Please read them carefully before
        proceeding.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">Definitions</h2>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>&quot;Company&quot; / &quot;We&quot; / &quot;Us&quot; / &quot;Our&quot;</strong> refers to The CoacHR
          People Advisory Services Private Limited, the provider of career
          enhancement services.
        </li>
        <li>
          <strong>&quot;User&quot; / &quot;You&quot; / &quot;Your&quot;</strong> refers to any individual who
          accesses or uses the platform for the services described in these
          Terms and Conditions.
        </li>
        <li>
          <strong>&quot;Services&quot;</strong> refers to the specific offerings including
          Mock Interview, Career Success Coaching, Video-based Mock Interview,
          ATS Friendly Resume & Psychometric Assessment and other related
          services offered by us.
        </li>
        <li>
          <strong>&quot;Coach&quot;</strong> refers to HR professionals & Coaching Experts
          assigned to conduct Mock interviews, Coaching sessions and share
          feedback.
        </li>
        <li>
          <strong>&quot;Session&quot;</strong> refers to any scheduled service
          interaction, including mock interviews, coaching, or resume
          consultations.
        </li>
        <li>
          <strong>&quot;Platform&quot;</strong> refers to the website where our services
          are hosted.
        </li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">Acceptance of Terms</h2>
      <p className="mb-4">By purchasing or using any of our services, you:</p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          Acknowledge that you have read, understood, and agreed to these Terms
          of Service.
        </li>
        <li>
          Agree to comply with any additional guidelines, policies, or
          agreements provided at the time of service purchase.
        </li>
        <li>
          Confirm that all information shared with us is accurate and truthful
          to the best of your knowledge.
        </li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">Service-Specific Terms</h2>
      <h3 className="mb-2 text-xl font-semibold">
        A. Mock Interview, Career Success Coaching & Video-based Mock Interview
      </h3>
      <ul className="mb-6 list-disc pl-6">
        <li>
          You must complete the Registration Form before the Coach is assigned.
        </li>
        <li>Sessions must be scheduled within 30 days of purchase.</li>
        <li>
          You are responsible for ensuring stable internet connectivity during
          the session.
        </li>
        <li>The session will not be extended if you join late.</li>
        <li>
          Rescheduling is allowed only once, with a 72-hour prior request.
        </li>
        <li>No refunds will be granted if you miss a scheduled session.</li>
        <li>
          Psychometric Assessment (wherever applicable) must be completed at
          least 24 hours before the session.
        </li>
        <li>
          Sessions will be conducted online or in-person based on your selected
          package. You may upgrade from online to in-person for which additional
          charges will apply.
        </li>
        <li>
          Inputs for Individual Development Plans (IDP) will be discussed by the
          Coach during session & final IDP will be shared post-session.
        </li>
        <li>
          The online sessions will be recorded and stored with us for 6 months.
        </li>
      </ul>

      <h3 className="mb-2 text-xl font-semibold">
        B. ATS-Friendly Resume Service
      </h3>
      <ul className="mb-6 list-disc pl-6">
        <li>
          You must submit complete and accurate information for resume drafting.
        </li>
        <li>
          The first draft will be shared within the communicated turnaround
          time.
        </li>
        <li>
          Two rounds of revisions are allowed; additional changes will incur
          extra charges.
        </li>
        <li>
          Once Resume Information Form is filled and submitted by the user, no
          refunds will be issued.
        </li>
        <li>
          We do not guarantee job placement by using the resume we provide.
        </li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
      <p className="mb-6">
        For any questions or concerns regarding these Terms of Service, please
        contact us at:
        <br />
        📧 Email: support@thecoachr.com
        <br />
        🌐 Website: www.thecoachr.com
      </p>

      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
