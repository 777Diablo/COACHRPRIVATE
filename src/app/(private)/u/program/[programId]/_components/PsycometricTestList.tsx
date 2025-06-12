"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust path based on ShadCN setup
import { type GetOneProgramEnrollment } from "@/types";
import { PSYCOMETRIC_TESTS } from "@/constant";
import { api } from "@/trpc/react";
import { type TestType } from "@prisma/client";
import { useRouter } from "next/navigation";

const PsychometricTests = ({
  enrollmentDetails,
}: {
  enrollmentDetails: GetOneProgramEnrollment;
}) => {
  const [testStatus, setTestStatus] = useState<Record<TestType, boolean>>({
    PSI: false,
    RSI: false,
    DISC: false,
  });

  // Fetch completed test results
  const testResults = api.psycometric.getResults.useQuery({
    programEnrollmentId: enrollmentDetails?.id ?? "",
    userId: "me",
  });

  // Update testStatus based on API data
  useEffect(() => {
    if (testResults.data) {
      const updatedStatus = { ...testStatus };
      testResults.data.forEach((result) => {
        updatedStatus[result.testType] = true;
      });
      setTestStatus(updatedStatus);
    }
  }, [testResults.data]);

  const router = useRouter();

  // Determine the index of the first incomplete test
  const completedTests = Object.values(testStatus);
  const currentTest = completedTests.indexOf(false); // First test not completed

  const handleTestStart = (testKey: TestType) => {
    if (!testStatus[testKey]) {
      // alert(`Starting ${PSYCOMETRIC_TESTS[testKey]}`);
      // setTestStatus((prev) => ({
      //   ...prev,
      //   [testKey]: true, // Mark test as completed
      // }));

      router.push(
        `/u/program/${enrollmentDetails?.programId}/ps?enrollmentId=${enrollmentDetails?.id}&testType=${testKey}`,
      );
    }
  };

  return (
    enrollmentDetails?.includePsycometric && (
      <div className="rounded-lg bg-white p-4 shadow-md">
        <h3 className="mb-4 text-lg font-semibold">Psychometric Tests</h3>
        <ol className="space-y-3">
          {Object.entries(PSYCOMETRIC_TESTS).map(([key, value], index) => {
            const isCompleted = testStatus[key as TestType];
            const isNextTest = index === currentTest;
            return (
              <li
                key={key}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span
                  className={`${isNextTest ? "font-medium text-blue-600" : "text-gray-500"}`}
                >
                  {value}
                </span>
                <Button
                  variant="default"
                  disabled={!isNextTest}
                  onClick={() => handleTestStart(key as TestType)}
                  className={`transition ${
                    isCompleted
                      ? "cursor-not-allowed bg-green-500"
                      : isNextTest
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "cursor-not-allowed bg-gray-300"
                  }`}
                >
                  {isCompleted ? "Completed" : "Start"}
                </Button>
              </li>
            );
          })}
        </ol>
      </div>
    )
  );
};

export default PsychometricTests;
