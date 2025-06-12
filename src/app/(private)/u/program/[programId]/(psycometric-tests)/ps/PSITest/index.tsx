"use client";
import {
  PSI_MAX_POINTS_PER_QUESTION,
  type PSIQuestion,
} from "@/server/questions/psi";
import React from "react";
import RatingFormPair from "../_components/RatingFormPair";
import { api } from "@/trpc/react";
import { TestType } from "@prisma/client";
import { HiPageLoader } from "@hidstech/common_components";
import { useRouter } from "next/navigation";

type props = {
  questions: PSIQuestion[];
  enrollmentId: string;
  programId: string;
};

const PSITest = ({ questions, enrollmentId, programId }: props) => {
  const router = useRouter();
  const submitResult = api.psycometric.submitAnswers.useMutation({
    onSuccess: () => {
      router.push(`/u/program/${programId}?enrollmentId=${enrollmentId}`);
    },
  });

  const handleFinish = (
    ratings: Record<number, { a: number; b: number }>,
  ): void => {
    const responses = Object.entries(ratings).map(([questionId, { a, b }]) => ({
      questionId: Number(questionId),
      scoreA: a,
      scoreB: b,
    }));

    submitResult.mutate({
      programEnrollmentId: enrollmentId,
      responses,
      testType: TestType.PSI,
    });
  };

  return (
    <>
      {submitResult.isPending && <HiPageLoader />}

      <div className="space-y-8 pt-[150px]">
        <h1 className="text-center text-2xl font-bold">PSI Test</h1>
        <RatingFormPair
          questions={questions}
          maxRating={PSI_MAX_POINTS_PER_QUESTION}
          onFinish={handleFinish}
          // displayType="number"
        />
      </div>
    </>
  );
};

export default PSITest;
