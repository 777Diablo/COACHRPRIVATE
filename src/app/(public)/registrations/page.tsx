"use client";
import { api } from "@/trpc/react";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { HiSkeleton } from "@hidstech/common_components";
import { motion } from "framer-motion";

export default function CareerSuccessPage() {
  const { data: user, isLoading } = api.user.getOne.useQuery({ id: "me" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background p-6 md:p-8"
    >
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Career Success Profile</h1>

        {isLoading ? (
          <div className="space-y-6">
            <HiSkeleton className="h-20 w-full" />
            <HiSkeleton className="h-20 w-full" />
            <HiSkeleton className="h-20 w-full" />
          </div>
        ) : (
          <DynamicForm formType="career_success" userData={user ?? null} />
        )}
      </div>
    </motion.div>
  );
}
