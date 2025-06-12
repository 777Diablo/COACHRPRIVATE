"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HiButton } from "@hidstech/common_components";
import { ArrowRight } from "lucide-react";
import StarRating from "./StarRating";

export type Question = {
  id: number;
  a: string;
  b: string;
};

type RatingFormPairProps = {
  questions: Question[];
  maxRating?: number;
  onFinish: (ratings: Record<number, { a: number; b: number }>) => void;
  displayType?: "star" | "number";
};

const RatingFormPair = ({
  questions,
  maxRating = 5,
  onFinish,
  displayType = "star",
}: RatingFormPairProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [ratings, setRatings] = useState<
    Record<number, { a: number; b: number }>
  >(
    questions.reduce(
      (acc, q) => {
        acc[q.id] = { a: 0, b: 0 };
        return acc;
      },
      {} as Record<number, { a: number; b: number }>,
    ),
  );

  const handleRating = (
    questionId: number,
    key: "a" | "b",
    rating: number,
  ): void => {
    if (key === "a") {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [questionId]: { a: rating, b: maxRating - rating },
      }));
    } else {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [questionId]: { a: maxRating - rating, b: rating },
      }));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleFinish = () => {
    onFinish(ratings);
  };

  const currentQuestion = questions[currentStep];

  return (
    currentQuestion && (
      <div className="mx-auto my-[150px] w-full max-w-xl space-y-4 p-4">
        <div className="text-center text-sm text-gray-500">
          Question {currentStep + 1} of {questions.length}
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Compare the following:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="text-lg font-medium">{currentQuestion.a}</div>
              <StarRating
                value={ratings[currentQuestion.id]?.a ?? 0}
                maxRating={maxRating}
                onRate={(rating) =>
                  handleRating(currentQuestion.id, "a", rating)
                }
                displayType={displayType}
              />
              <div className="text-primary">
                {(ratings[currentQuestion.id]?.a ?? 0) > 0
                  ? `You rated this ${ratings[currentQuestion.id]?.a} out of ${maxRating}`
                  : "Select a rating"}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-lg font-medium">{currentQuestion.b}</div>
              <StarRating
                value={ratings[currentQuestion.id]?.b ?? 0}
                maxRating={maxRating}
                onRate={(rating) =>
                  handleRating(currentQuestion.id, "b", rating)
                }
                displayType={displayType}
              />
              <div className="text-primary">
                {(ratings[currentQuestion.id]?.b ?? 0) > 0
                  ? `You rated this ${ratings[currentQuestion.id]?.b} out of ${maxRating}`
                  : "Select a rating"}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <HiButton
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            title="Previous"
          />
          {currentStep === questions.length - 1 ? (
            <HiButton onClick={handleFinish} title="Finish" />
          ) : (
            <HiButton onClick={handleNext} endIcon={ArrowRight} title="Next" />
          )}
        </div>
      </div>
    )
  );
};

export default RatingFormPair;
