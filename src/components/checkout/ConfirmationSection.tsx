"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Program } from "@/app/(public)/program/[slug]/types";

interface ConfirmationSectionProps {
  orderDetails: {
    program: Program;
  };
}

// export default function ConfirmationSection({ orderDetails }) {
export default function ConfirmationSection({
  orderDetails,
}: ConfirmationSectionProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
      >
        <CheckCircle className="h-8 w-8 text-primary" />
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Payment Successful!</h2>
        <p className="text-muted-foreground">
          Thank you for purchasing {orderDetails.program.title}
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-4">
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a confirmation email with all the details to your
          email address. You can start your program right away!
        </p>

        <div className="flex flex-col gap-4">
          <Button size="lg">Start Program Now</Button>
          <Button variant="outline">View Dashboard</Button>
        </div>
      </div>
    </motion.div>
  );
}
