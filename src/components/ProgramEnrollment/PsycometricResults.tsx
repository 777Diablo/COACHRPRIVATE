"use client";
import { PSYCOMETRIC_TESTS } from "@/constant";
import { api } from "@/trpc/react";
import { TestType } from "@prisma/client";
import React, { useState } from "react";

import { ChevronDown, ChevronUp, CheckCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@hidstech/common_components/components/ui/badge.js";
import { Button } from "@/components/ui/button";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@hidstech/common_components/components/ui/collapsible.js";

type Props = {
  enrollmentId: string;
};

const PsycometricResults = ({ enrollmentId }: Props) => {
  // Track which test details are expanded
  const [expandedTests, setExpandedTests] = useState<Record<TestType, boolean>>(
    {
      DISC: false,
      PSI: false,
      RSI: false,
    },
  );

  // Get results
  const results = api.psycometric.getResults.useQuery({
    programEnrollmentId: enrollmentId,
  });

  console.log("results", results);

  // Toggle expanded state for a test
  const toggleExpand = (testType: TestType) => {
    setExpandedTests((prev) => ({
      ...prev,
      [testType]: !prev[testType],
    }));
  };

  if (results.isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }
  if (results.isError) {
    return (
      <Card className="border-destructive bg-destructive/10">
        <CardContent className="pt-6">
          <p className="text-center text-destructive">
            Failed to load psychometric test results
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Psychometric Test Results</h3>

      <div className="grid gap-4 md:grid-cols-1">
        {Object.entries(PSYCOMETRIC_TESTS).map(([_testType, testName]) => {
          const testType = _testType as TestType;
          const resultData = results.data?.find(
            (result) => result.testType === testType,
          );

          const isCompleted = !!resultData;

          return (
            <Card
              key={testType}
              className={`transition-all duration-200 ${isCompleted ? "border-primary/20" : "border-muted"}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{testName}</CardTitle>
                  <Badge variant={isCompleted ? "default" : "outline"}>
                    {isCompleted ? "Completed" : "Not Completed"}
                  </Badge>
                </div>
                {isCompleted && (
                  <CardDescription>
                    Completed on{" "}
                    {new Date(
                      resultData.createdAt || Date.now(),
                    ).toLocaleDateString()}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent>
                {isCompleted ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-medium">Result:</span>{" "}
                        <span className="font-semibold text-primary">
                          {resultData.outcome}
                        </span>
                      </div>
                    </div>

                    {/* Collapsible section for detailed responses */}
                    {
                      <Collapsible
                        open={expandedTests[testType]}
                        onOpenChange={() => toggleExpand(testType)}
                        className="w-full"
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex w-full justify-between"
                          >
                            <span>View Detailed Result</span>
                            {expandedTests[testType] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-3">
                          {/* {resultData.responses.map((response, index) => (
                              <div
                                key={index}
                                className="rounded-md border p-3"
                              >
                                <p className="mb-1 font-medium">
                                  Q: {response.question}
                                </p>
                                <p className="text-muted-foreground">
                                  A: {response.answer}
                                </p>
                              </div>
                            ))} */}
                          <pre>
                            {JSON.stringify(resultData.result, null, 2)}
                          </pre>
                        </CollapsibleContent>
                      </Collapsible>
                    }
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <XCircle className="h-5 w-5" />
                    <span>This test has not been completed yet</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default PsycometricResults;
