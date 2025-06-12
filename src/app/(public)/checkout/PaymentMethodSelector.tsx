"use client";

import { Button } from "@hidstech/common_components/components/ui/button.js";

import { CreditCard, Wallet } from "lucide-react";
import { cn } from "@hidstech/common_components";
import { type PaymentMethod } from "@prisma/client";

type PaymentMethods = {
  id: PaymentMethod;
  name: string;
  icon: typeof CreditCard;
  description: string;
};

export const paymentMethods: PaymentMethods[] = [
  {
    id: "CARD",
    name: "Credit / Debit Card",
    icon: CreditCard,
    description: "Secure payment with credit or debit card",
  },
  // {
  //   id: "paypal",
  //   name: "PayPal",
  //   icon: Paypal,
  //   description: "Pay with your PayPal account",
  // },
  {
    id: "WALLET",
    name: "Digital Wallet",
    icon: Wallet,
    description: "Apple Pay, Google Pay, or other digital wallets",
  },
];

interface PaymentMethodSelectorProps {
  onSelect: (method: PaymentMethod) => void;
  selected: PaymentMethod;
}

export function PaymentMethodSelector({
  onSelect,
  selected,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => {
        const Icon = method.icon;
        return (
          <Button
            key={method.id}
            variant="outline"
            className={cn(
              "h-auto w-full justify-start gap-4 p-4",
              selected === method.id && "ring-2 ring-primary",
            )}
            onClick={() => onSelect(method.id)}
          >
            <Icon className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">{method.name}</div>
              <div className="text-sm text-muted-foreground">
                {method.description}
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
