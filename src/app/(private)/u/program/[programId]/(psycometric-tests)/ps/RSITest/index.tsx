"use client";
import {
  RSI_MAX_POINTS_PER_QUESTION,
  type RSIQuestion,
} from "@/server/questions/rsi";
import React from "react";
import RatingFormPair from "../_components/RatingFormPair";
import { api } from "@/trpc/react";
import { TestType } from "@prisma/client";
import { HiPageLoader } from "@hidstech/common_components";
import { useRouter } from "next/navigation";

type props = {
  questions: RSIQuestion[];
  enrollmentId: string;
  programId: string;
};

const RSITest = ({ questions, enrollmentId, programId }: props) => {
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
      testType: TestType.RSI,
    });
  };

  return (
    <>
      {submitResult.isPending && <HiPageLoader />}

      <div className="space-y-8 pt-[150px]">
        <h1 className="text-center text-2xl font-bold">RSI Test</h1>
        <RatingFormPair
          questions={questions}
          maxRating={RSI_MAX_POINTS_PER_QUESTION}
          onFinish={handleFinish}
          // displayType="number"
        />
      </div>
    </>
  );
};

export default RSITest;
