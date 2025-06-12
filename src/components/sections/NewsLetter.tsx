"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { HiButton } from "@hidstech/common_components";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  contentPreference: string;
  experienceLevel: string;
  dob: string;
  interests: string[];
  comments: string;
  newsletter: boolean;
}

const Newsletter: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    contentPreference: "",
    experienceLevel: "",
    dob: "",
    interests: [],
    comments: "",
    newsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      if (target.type === "checkbox") {
        setFormData((prev) => ({
          ...prev,
          [target.name]: target.checked,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [target.name]: target.value,
        }));
      }
    } else if (target instanceof HTMLSelectElement) {
      if (target.multiple) {
        const selectedOptions = Array.from(target.selectedOptions).map(
          (option) => option.value,
        );
        setFormData((prev) => ({
          ...prev,
          [target.name]: selectedOptions,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [target.name]: target.value,
        }));
      }
    } else if (target instanceof HTMLTextAreaElement) {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated API call
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8 flex flex-col shadow-sm">
      <div className="mb-8">
        <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Stay Updated with Career Tips
        </h3>
        <p className="text-gray-600 dark:text-neutral-400">
          Subscribe to receive weekly insights on interviews, career development, and trends.
        </p>
      </div>

      <form
        className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email Address"
            className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Additional Comments or Suggestions"
            className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-4 py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-3 text-sm text-gray-600 dark:text-neutral-400">
            I agree to receive career tips and updates.
          </label>
        </div>

        <HiButton
          type="submit"
          disabled={isSubmitting}
          variant="secondary"
          size="lg"
          className="btn !rounded-[4px] btn--theme hover--tra-white"
          endIcon={<Send className="h-5 w-5" />}
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          Submit
        </HiButton>
      </form>
    </div>
  );
};

export default Newsletter;