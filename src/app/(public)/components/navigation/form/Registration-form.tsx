'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  country: string;
  role: string;
  institution: string;
  jobSearchStage: string[];
  hearAboutUs: string;
  interviewChallenges: string;
  preparationTimeline: string;
  emailUpdates: boolean;
}

export default function RegistrationForm({
  onSubmit,
}: {
  onSubmit: (data: RegistrationFormData) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const handleFormSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error in RegistrationForm submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-gray-100">Help Us to Serve You Better</h1>
        <p className="text-muted-foreground">
          Tell us a bit about yourself to get your personalized mock interview questions.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("firstName", { required: true })}
              className={errors.firstName ? "border-destructive" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName", { required: true })}
              className={errors.lastName ? "border-destructive" : ""}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            className={errors.email ? "border-destructive" : ""}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>State</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="ca">California</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Country</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Which Best Describes You</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="jobseeker">Job Seeker</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution">College/School</Label>
          <Input
            id="institution"
            {...register("institution", { required: true })}
            className={errors.institution ? "border-destructive" : ""}
          />
        </div>

        <div className="space-y-4">
          <Label>What stage are you at in your job search?</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="actively-applying" {...register("jobSearchStage")} value="actively-applying" />
              <Label htmlFor="actively-applying">Actively applying</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="preparing-interviews" {...register("jobSearchStage")} value="preparing-interviews" />
              <Label htmlFor="preparing-interviews">Preparing for upcoming interviews</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="exploring-options" {...register("jobSearchStage")} value="exploring-options" />
              <Label htmlFor="exploring-options">Just exploring options</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
          <Input
            id="hearAboutUs"
            {...register("hearAboutUs", { required: true })}
            className={errors.hearAboutUs ? "border-destructive" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interviewChallenges">What challenges do you face most during interviews?</Label>
          <Textarea
            id="interviewChallenges"
            {...register("interviewChallenges", { required: true })}
            className={errors.interviewChallenges ? "border-destructive" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preparationTimeline">What is your time frame for achieving your interview preparation goals?</Label>
          <Input
            id="preparationTimeline"
            {...register("preparationTimeline", { required: true })}
            className={errors.preparationTimeline ? "border-destructive" : ""}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="emailUpdates" {...register("emailUpdates")} />
          <Label htmlFor="emailUpdates">I would like to receive updates, promotions, and news via email.</Label>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </motion.div>
  );
}