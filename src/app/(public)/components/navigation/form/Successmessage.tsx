'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  email: string;
  password: string;
  onGetStarted: () => void;
}

export default function SuccessMessage({
  email,
  password,
  onGetStarted
}: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
      >
        <CheckCircle className="h-8 w-8 text-primary" />
      </motion.div>

      <h2 className="text-2xl font-bold mb-4">
        Your free mock interview question is ready
      </h2>

      <p className="text-muted-foreground mb-8">
        Use the following credentials to access your account
      </p>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-medium">{email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Password</p>
              <p className="font-medium">{password}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        size="lg"
        onClick={onGetStarted}
        className="w-full"
      >
        Get Started
      </Button>
    </motion.div>
  );
}