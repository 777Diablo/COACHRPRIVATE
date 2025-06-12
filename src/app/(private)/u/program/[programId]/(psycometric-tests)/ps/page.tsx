import { api } from "@/trpc/server";
import { TestType } from "@prisma/client";
import React from "react";
import PSITest from "./PSITest";
import { type PSIQuestion } from "@/server/questions/psi";
import { type RSIQuestion } from "@/server/questions/rsi";
import RSITest from "./RSITest";
import { type DISCQuestion } from "@/server/questions/disc";
import DISCTest from "./DISCTest";

const page = async ({
  params,
  searchParams,
}: {
  params: { programId: string };
  searchParams: { enrollmentId: string; testType: TestType };
}) => {
  if (!searchParams.enrollmentId)
    return (
      <div>
        <p>Enrollment not found</p>
      </div>
    );

  const programId = params.programId;

  const enrollmentDetails = await api.programEnrollment.getOne({
    id: searchParams.enrollmentId,
  });

  if (!enrollmentDetails)
    return (
      <div>
        <p>Enrollment not found</p>
      </div>
    );

  if (enrollmentDetails.includePsycometric !== true)
    return <div>Not allowed</div>;

  //   now we know that the user is allowed to take the test
  //   so we can render the test based on the test type

  const testType = searchParams.testType.toUpperCase();

  if (testType === TestType.PSI) {
    const questions = (await api.psycometric.getQuestions({
      test: testType,
    })) as PSIQuestion[];

    return (
      <PSITest
        questions={questions}
        enrollmentId={searchParams.enrollmentId}
        programId={programId}
      />
    );
  }

  if (testType === TestType.RSI) {
    const questions = (await api.psycometric.getQuestions({
      test: testType,
    })) as RSIQuestion[];

    return (
      <RSITest
        questions={questions}
        enrollmentId={searchParams.enrollmentId}
        programId={programId}
      />
    );
  }

  if (testType === TestType.DISC) {
    const questions = (await api.psycometric.getQuestions({
      test: testType,
    })) as DISCQuestion[];

    return (
      <DISCTest
        questions={questions}
        enrollmentId={searchParams.enrollmentId}
        programId={programId}
      />
    );
  }

  return <div>Error occured</div>;
};

export default page;
