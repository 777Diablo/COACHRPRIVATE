"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-slate-900">
      <section className="relative bg-gradient-to-b from-primary/5 via-background to-background py-16 dark:from-primary/10 dark:via-slate-900 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-3xl font-bold text-foreground dark:text-slate-200 md:text-4xl">
              Refund Policy
            </h1>
            <p className="text-muted-foreground dark:text-slate-400">
              Effective Date: March 20, 2024
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <section className="prose max-w-none dark:prose-invert">
            <p className="text-muted-foreground dark:text-slate-400">
              At CoacHR, we strive to provide high-quality career enhancement
              services including Mock Interviews, Video-Based Interviews, Career
              Success Coaching, ATS-Friendly Resume and Psychometrics. While we
              aim for complete customer satisfaction, we understand that
              circumstances may arise where users seek refunds. This Refund
              Policy outlines the conditions under which refunds may or may not
              be granted.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold dark:text-slate-200">
              A. Refund Eligibility for Services
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg bg-card p-6 dark:bg-slate-800">
                <h3 className="mb-4 text-xl font-medium dark:text-slate-200">
                  1. Category A: Mock Interview, Career Success Coaching &
                  Video-Based Mock Interview
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium text-foreground dark:text-slate-300">
                      Refund Maybe Permitted basis request if:
                    </h4>
                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground dark:text-slate-400">
                      <li>
                        The assigned Coach fails to attend the scheduled session
                        and no reschedule option is provided.
                      </li>
                      <li>
                        Technical issues from our side prevent the session from
                        being conducted and no reschedule option is provided.
                      </li>
                      <li>
                        The Feedback or Individual Development Plan (as
                        applicable to purchased service) is delayed by more than
                        72 hours.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium text-foreground dark:text-slate-300">
                      Refund Not Permitted if:
                    </h4>
                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground dark:text-slate-400">
                      <li>
                        The psychometric assessment link has been shared, or the
                        assessment has been completed.
                      </li>
                      <li>
                        The user fails to attend or delays in joining a
                        scheduled or a rescheduled session.
                      </li>
                      <li>
                        The user is dissatisfied due to subjective reasons
                        (e.g., not liking the feedback).
                      </li>
                      <li>
                        The user initially opted for an in-person session but
                        later choose to switch to an online session.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-card p-6 dark:bg-slate-800">
                <h3 className="mb-4 text-xl font-medium dark:text-slate-200">
                  2. Category B: ATS-Friendly Resume Service
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium text-foreground dark:text-slate-300">
                      Refund Maybe Permitted basis request if:
                    </h4>
                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground dark:text-slate-400">
                      <li>
                        The resume draft is not delivered within the committed
                        timeframe (except in cases of additional inputs required
                        from the user).
                      </li>
                      <li>
                        A refund request is made within 6 hours of purchase and
                        before filling Resume Information Form.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium text-foreground dark:text-slate-300">
                      Refund Not Permitted if:
                    </h4>
                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground dark:text-slate-400">
                      <li>The user has filled the Resume Information Form</li>
                      <li>
                        The user is dissatisfied due to subjective reasons
                        (e.g., preference over wording or formatting).
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Sections */}
          <section className="space-y-6">
            <div className="rounded-lg bg-card p-6 dark:bg-slate-800">
              <h2 className="mb-4 text-xl font-semibold dark:text-slate-200">
                B. Rescheduling & Adjustments (For Mock Interviews & Career
                Coaching)
              </h2>
              <ul className="space-y-2 text-muted-foreground dark:text-slate-400">
                <li>
                  • Users may reschedule their session only once if requested at
                  least 72 hours before the scheduled session. No refund will be
                  provided if the user fails to join a rescheduled session.
                </li>
                <li>
                  • In case of an emergency or unavoidable circumstance,
                  rescheduling beyond the permitted limit will be considered at
                  the sole discretion of the Admin.
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-card p-6 dark:bg-slate-800">
              <h2 className="mb-4 text-xl font-semibold dark:text-slate-200">
                C. Technical & Service Issues
              </h2>
              <ul className="space-y-2 text-muted-foreground dark:text-slate-400">
                <li>
                  • If a session is disrupted due to a technical issue on our
                  end (e.g., platform failure, unavailability of the assigned
                  Coach), we will offer a rescheduled session at no extra
                  charge.
                </li>
                <li>
                  • If the issue cannot be resolved, and the session remains
                  incomplete, we will offer a rescheduled session at no extra
                  charge basis availability of the Coach
                </li>
              </ul>
            </div>

            {/* Refund Processing */}
            <div className="rounded-lg bg-card p-6 dark:bg-slate-800">
              <h2 className="mb-4 text-xl font-semibold dark:text-slate-200">
                D. Refund Processing
              </h2>
              <ul className="space-y-2 text-muted-foreground dark:text-slate-400">
                <li>
                  • If a refund is approved, the amount will be credited back to
                  the original payment method within 7-10 business days.
                </li>
                <li>
                  • Any payment processing fees incurred will be deducted from
                  the refund amount.
                </li>
                <li>
                  • Refunds will not be issued in cash or transferred to an
                  alternate account.
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-card p-6 dark:bg-slate-800">
              <h2 className="mb-4 text-xl font-semibold dark:text-slate-200">
                E. Contact for Refund Requests
              </h2>
              <p className="mb-4 text-muted-foreground dark:text-slate-400">
                All refund requests must be sent to support@thecoachr.com with
                the subject line &quot;Refund Request - [Service Name]&quot; and must
                include:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground dark:text-slate-400">
                <li>Full Name & Registered Email</li>
                <li>Order Number & Date of Purchase</li>
                <li>Reason for Refund Request</li>
                <li>Supporting Details (if applicable)</li>
              </ul>
              <p className="mt-4 text-muted-foreground dark:text-slate-400">
                Our team will review the request and respond within 3-5 business
                days with a resolution.
              </p>
            </div>

            <div className="rounded-lg bg-card p-6 dark:bg-slate-800">
              <h2 className="mb-4 text-xl font-semibold dark:text-slate-200">
                F. Policy Updates
              </h2>
              <p className="text-muted-foreground dark:text-slate-400">
                We reserve the right to modify or update this Refund Policy at
                any time. Any changes will be reflected on this page, and
                continued use of our services implies acceptance of the updated
                policy.
              </p>
            </div>

            <div className="rounded-lg bg-card p-6 dark:bg-slate-800">
              <h2 className="mb-4 text-xl font-semibold dark:text-slate-200">
                G. Contact Us
              </h2>
              <p className="text-muted-foreground dark:text-slate-400">
                For any questions or concerns regarding Refund Policy, please
                contact us at:
              </p>
              <div className="mt-2 space-y-1 text-muted-foreground dark:text-slate-400">
                <p>📧 Email: support@thecoachr.com</p>
                <p>🌐 Website: www.thecoachr.com</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}
