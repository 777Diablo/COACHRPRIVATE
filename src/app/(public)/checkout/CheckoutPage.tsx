"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CouponInput } from "./CouponInput";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@hidstech/common_components/components/ui/card.js";
import { Separator } from "@hidstech/common_components/components/ui/separator.js";
import { type Program } from "@prisma/client";
import { api } from "@/trpc/react";
import { HiButton, HiErrorUI, HiPageLoader } from "@hidstech/common_components";
import { useSession } from "next-auth/react";
import Script from "next/script";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  // const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const programId = searchParams.get("program");

  // get program details
  const {
    data: selectedProgram,
    isLoading,
    error,
  } = api.program.getOne.useQuery({ id: programId! }, { enabled: !!programId });

  useEffect(() => {
    // const programId = searchParams.get("program");
    // const program = programs.find((p) => p.id === programId);
    if (selectedProgram) {
      // setSelectedProgram(selectedProgram);
      setTotal(selectedProgram.totalPrice);
    }
  }, [selectedProgram]);

  const handleApplyCoupon = (discountPercent: number) => {
    // if (selectedProgram) {
    //   setDiscount((selectedProgram.price * discountPercent) / 100);
    //   setTotal(
    //     selectedProgram.price - (selectedProgram.price * discountPercent) / 100,
    //   );
    // }
  };

  const { data: session } = useSession();
  const router = useRouter();
  const createOrderMutation = api.order.create.useMutation({
    onSuccess: (data) => {
      // toast.success("Payment Successful! Order Confirmed.");
      // router.push(`/u/my-orders`);
    },
    onError: (err) => {
      toast.error("Payment processing error. Please try again.");
    },
  });

  const updateOrderMutation = api.order.updateOrderStatus.useMutation({
    onSuccess: (data) => {
      toast.success("Payment Successful! Order Confirmed.");
      router.push(`/u/my-orders`);
    },
    onError: (err) => {
      toast.error("Payment processing error. Please try again.");
    },
  });

  if (isLoading) {
    return <HiPageLoader />;
  }

  if (!programId || !selectedProgram || error) {
    return <HiErrorUI errorMessage={"Program not found"} status="404" />;
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // TODO: Create Razor pay order id inside the createOrder mutation, instead of calling the api
      const response = await fetch("/api/create-razor-order", {
        method: "POST",
      });
      const data = await response.json();

      if (!session?.user) {
        toast.error("Please login to checkout.");
        return router.push(`/signin?cb=/checkout?program=${programId}`);
      }

      const AMOUNT = total;
      const newOrder = await createOrderMutation.mutateAsync({
        items: [
          {
            programId: selectedProgram.id,
            price: selectedProgram.totalPrice,
          },
        ],
        totalPrice: AMOUNT,
        paymentMethod: "RAZORPAY",
      });

      if (!newOrder.order?.id) {
        return toast.error("Payment processing error. Please try again.");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: newOrder.order.totalPrice,
        currency: "INR",
        name: "CoachR",
        description: "CoachR Payment",
        // order_id: newOrder.order.id,
        order_id: data.orderId ?? newOrder.order.id,
        theme: { color: "#F37254" },
        handler: async function (response: any) {
          console.log("Payment verified:", response);
          // Call backend API to verify payment and update order status
          updateOrderMutation.mutate({
            orderId: newOrder.order.id,
            paymentId: response?.razorpay_payment_id as string,
            razorpay_payment_id: response.razorpay_payment_id as string,
            razorpay_order_id: response.razorpay_order_id as string,
            razorpay_signature: response.razorpay_signature as string,
            paymentStatus: "SUCCESS",
          });
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-24 min-h-screen bg-background">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {(createOrderMutation.isPending || updateOrderMutation.isPending) && (
        <HiPageLoader />
      )}

      <div className="container mx-auto p-4 md:p-8">
        <h1 className="mb-6 text-3xl font-bold dark:text-gray-100">Checkout</h1>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="dark:text-gray-200">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={"https://picsum.photos/200"}
                      alt={selectedProgram.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="font-medium dark:text-gray-300">
                        {selectedProgram.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        &#x20B9;{selectedProgram.totalPrice}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="mb-2 font-medium dark:text-gray-300">
                      Have a coupon?
                    </h3>
                    <CouponInput onApply={handleApplyCoupon} />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>&#x20B9; {selectedProgram.totalPrice}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-&#x20B9; {discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>&#x20B9; {total}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    By completing your purchase you agree to our{" "}
                    <a href="#" className="underline">
                      Terms of Service
                    </a>
                  </div>

                  <div className="flex justify-end">
                    <HiButton
                      className="mt-5"
                      disabled={isProcessing}
                      onClick={handlePayment}
                    >
                      {isProcessing ? "Processing..." : "Pay Now"}
                    </HiButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
