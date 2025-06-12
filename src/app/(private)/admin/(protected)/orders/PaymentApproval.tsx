"use client";
import { api } from "@/trpc/react";
import { HiButton } from "@hidstech/common_components";
import React from "react";

const PaymentApproval = ({ orderId }: { orderId: string }) => {
  const utils = api.useUtils();
  const mutation = api.order.updateOrderStatus.useMutation({
    onSuccess: async () => {
      await utils.order.getAll.invalidate();
    },
  });

  // ! WE ARE NOW USING RAZOR PAY TO HANDLE PAYMENTS - SO NO LONGER NEEDED
  // const handleApprove = () => {
  //   mutation.mutate({
  //     orderId: orderId,
  //     status: "COMPLETED",
  //     paymentStatus: "SUCCESS",
  //   });
  // };

  return (
    <HiButton
      // onClick={handleApprove}
      // variant="primary"
      isLoading={mutation.isPending}
    >
      Approve Payment
    </HiButton>
  );
};

export default PaymentApproval;
