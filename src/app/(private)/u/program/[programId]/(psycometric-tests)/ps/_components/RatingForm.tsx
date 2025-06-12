"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { HiButton } from "@hidstech/common_components";
import { ArrowLeft, ArrowRight } from "lucide-react";
import StarRating from "./StarRating";

export type Question = {
  id: number;
  statement: string;
  description?: string;
};

type RatingFormProps = {
  questions: Question[];
  maxRating?: number;
  onFinish: (ratings: Record<number, number>) => void;
  displayType?: "star" | "number";
};

const RatingForm = ({
  questions,
  maxRating = 5,
  onFinish,
  displayType = "star",
}: RatingFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>(
    questions.reduce(
      (acc, q) => {
        acc[q.id] = 0;
        return acc;
      },
      {} as Record<number, number>,
    ),
  );

  const handleRating = (questionId: number, rating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [questionId]: rating,
    }));
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
            <CardTitle>{currentQuestion?.statement}</CardTitle>
            {currentQuestion?.description && (
              <CardDescription>{currentQuestion.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <StarRating
              value={ratings[currentQuestion.id] ?? 0}
              maxRating={maxRating}
              onRate={(rating) => handleRating(currentQuestion.id, rating)}
              displayType={displayType}
            />
            <div className="font-medium text-primary">
              {(ratings[currentQuestion.id] ?? 0) > 0
                ? `You rated this ${ratings[currentQuestion.id] ?? 0} out of ${maxRating} stars`
                : "Select a rating"}
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

export default RatingForm;
