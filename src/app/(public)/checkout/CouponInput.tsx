"use client";

import { useState } from "react";
import { Button } from "@hidstech/common_components/components/ui/button.js";
import { Input } from "@hidstech/common_components/components/ui/input.js";
// import { toast } from "sonner";

interface CouponInputProps {
  onApply: (discount: number) => void;
}

export function CouponInput({ onApply }: CouponInputProps) {
  const [coupon, setCoupon] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (coupon.toLowerCase() === "save20") {
      onApply(20);
      //   toast.success("Coupon applied successfully!");
    } else {
      //   toast.error("Invalid coupon code");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter coupon code"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />
      <Button
        variant="outline"
        onClick={handleApply}
        disabled={!coupon || isLoading}
      >
        {isLoading ? "Applying..." : "Apply"}
      </Button>
    </div>
  );
}
