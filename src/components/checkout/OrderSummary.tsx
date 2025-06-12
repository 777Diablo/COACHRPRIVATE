"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { Program } from "@/app/(public)/program/[slug]/types";

interface OrderSummaryProps {
  orderDetails: {
    program: Program;
  };
}

// export default function OrderSummary({ orderDetails }) {
export default function OrderSummary({
  orderDetails,
}: OrderSummaryProps): JSX.Element {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold">Order Summary</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">{orderDetails.program.title}</h4>
              <p className="text-sm text-muted-foreground">
                {orderDetails.program.description}
              </p>
            </div>
            <span className="font-bold">{orderDetails.program.price}</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between font-bold">
              <span>Total</span>
              <span>{orderDetails.program.price}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 text-sm text-muted-foreground">
          <p>
            By proceeding with the purchase, you agree to our terms and
            conditions.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
