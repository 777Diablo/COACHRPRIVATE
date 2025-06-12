"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserInfo } from "@/app/(public)/program/[slug]/types";

interface BillingFormProps {
  onComplete: (data: UserInfo) => void;
}

export default function BillingForm({
  onComplete,
}: BillingFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>();

  const onSubmit = (data: UserInfo): void => {
    onComplete(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Billing Information</h2>
        <p className="text-muted-foreground">
          Please provide your billing details
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className={errors.email ? "border-destructive" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            {...register("phone", { required: true })}
            className={errors.phone ? "border-destructive" : ""}
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          Continue to Payment
        </Button>
      </form>
    </motion.div>
  );
}
