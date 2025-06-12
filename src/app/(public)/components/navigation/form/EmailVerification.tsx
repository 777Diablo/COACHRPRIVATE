"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailVerificationProps {
  onVerificationComplete: () => void;
}

export default function EmailVerification({
  onVerificationComplete,
}: EmailVerificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
      >
        <Mail className="h-8 w-8 text-primary" />
      </motion.div>

      <h2 className="mb-4 text-2xl font-bold">Check Your Email</h2>

      <p className="mb-8 text-muted-foreground">
        A verification link has been sent to your email. Please click the link
        to activate your account.
      </p>

      <Button size="lg" onClick={onVerificationComplete} className="w-full">
        Proceed to Login
      </Button>

      <p className="mt-4 text-sm text-muted-foreground">
        Didn&apos;t receive the email?{" "}
        <button className="text-primary hover:underline">
          Resend verification email
        </button>
      </p>
    </motion.div>
  );
}
