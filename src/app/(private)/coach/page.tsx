import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  return redirect("/coach/dashboard");
};

export default page;
