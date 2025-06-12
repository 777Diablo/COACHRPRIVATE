"use client";
import React, { Suspense } from "react";
import CheckoutPage from "./CheckoutPage";
import { HiPageLoader } from "@hidstech/common_components";

const page = () => {
  return (
    <Suspense fallback={<HiPageLoader />}>
      <CheckoutPage />
    </Suspense>
  );
};

export default page;
