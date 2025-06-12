"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { HiButton } from "@hidstech/common_components"
import { ArrowLeft, ArrowRight } from "lucide-react"
import StarRating from "./StarRating"
import { type Question } from "./RatingForm"

type RatingFormPairProps = {
    questionPairs: Question[][];
    maxRating?: number;
    onFinish: (ratings: number[]) => void;
    displayType?: "star" | "number";
};

const RatingFormPair = ({ questionPairs, maxRating = 5, onFinish, displayType = "star" }: RatingFormPairProps) => {
    const flattenedQuestions = questionPairs.flat()
    const [currentStep, setCurrentStep] = useState(0)
    const [ratings, setRatings] = useState<number[]>(Array(flattenedQuestions.length).fill(0))

    const handleRating = (questionIndex: number, rating: number) => {
        const newRatings = [...ratings]
        // Calculate the paired question index assuming questions are in pairs
        const pairIndex = questionIndex % 2 === 0 ? questionIndex + 1 : questionIndex - 1

        newRatings[questionIndex] = rating
        newRatings[pairIndex] = maxRating - rating  // configurable based on maxRating

        setRatings(newRatings)
    }

    const handlePrevious = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1)
    }

    const handleNext = () => {
        if (currentStep < questionPairs.length - 1) setCurrentStep(currentStep + 1)
    }

    const handleFinish = () => {
        onFinish(ratings)
    }

    const currentPair = questionPairs[currentStep]

    return (
        <div className="my-[150px] w-full max-w-xl mx-auto space-y-4 p-4">
            <div className="text-center text-sm text-gray-500">
                Question Pair {currentStep + 1} of {questionPairs.length}
            </div>

            <Card className="w-full">
                {currentPair?.map((question, index) => {
                    const questionIndex = currentStep * 2 + index
                    return (
                        <div key={question.id}>
                            <CardHeader>
                                <CardTitle>{question.text}</CardTitle>
                                {question.description && (
                                    <CardDescription>{question.description}</CardDescription>
                                )}
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                <StarRating
                                    value={ratings[questionIndex] ?? 0}
                                    maxRating={maxRating}
                                    onRate={(rating) => handleRating(questionIndex, rating)}
                                    displayType={displayType}
                                />
                                <div className="text-primary font-medium">
                                    {(ratings[currentStep] ?? 0) > 0
                                        ? `You rated this ${ratings[questionIndex]} out of ${maxRating} stars`
                                        : "Select a rating"}
                                </div>
                            </CardContent>
                        </div>
                    )
                })}
            </Card>

            <div className="flex justify-between">
                <HiButton onClick={handlePrevious} disabled={currentStep === 0} variant="outline" title="Previous" />
                {currentStep === questionPairs.length - 1 ? (
                    <HiButton onClick={handleFinish} title="Finish" />
                ) : (
                    <HiButton onClick={handleNext} endIcon={ArrowRight} title="Next" />
                )}
            </div>
        </div>
    )
};

export default RatingFormPair;