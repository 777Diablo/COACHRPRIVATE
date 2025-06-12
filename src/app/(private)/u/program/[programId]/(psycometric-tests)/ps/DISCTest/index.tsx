"use client";
import React from "react";
import RatingForm from "../_components/RatingForm";
import {
  DISC_MAX_POINTS_PER_QUESTION,
  type DISCQuestion,
} from "@/server/questions/disc";
import { api } from "@/trpc/react";
import { TestType } from "@prisma/client";
import { HiPageLoader } from "@hidstech/common_components";
import { useRouter } from "next/navigation";

type props = {
  questions: DISCQuestion[];
  enrollmentId: string;
  programId: string;
};

const DISCTest = ({ questions, enrollmentId, programId }: props) => {
  const router = useRouter();
  const submitResult = api.psycometric.submitAnswers.useMutation({
    onSuccess: () => {
      router.push(`/u/program/${programId}?enrollmentId=${enrollmentId}`);
    },
  });

  const handleFinish = (ratings: Record<number, number>) => {
    console.log("Final Ratings (Pair):", ratings);
    const responses = Object.entries(ratings).map(([questionId, rating]) => ({
      questionId: Number(questionId),
      scoreA: rating,
    }));

    submitResult.mutate({
      programEnrollmentId: enrollmentId,
      responses,
      testType: TestType.DISC,
    });
  };

  return (
    <>
      {submitResult.isPending && <HiPageLoader />}

      <div className="space-y-8 pt-[150px]">
        <h1 className="text-center text-2xl font-bold">DISC Test</h1>
        <RatingForm
          questions={questions}
          maxRating={DISC_MAX_POINTS_PER_QUESTION}
          onFinish={handleFinish}
          // displayType="number"
        />
      </div>
    </>
  );
};

export default DISCTest;
