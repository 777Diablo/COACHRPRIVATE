"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { HiButton } from "@hidstech/common_components"
import { ArrowLeft, ArrowRight } from "lucide-react"
import StarRating from "./StarRating"

export type Question = {
    id: number
    text: string
    description?: string
};

type RatingFormProps = {
    questions: Question[];
    maxRating?: number;
    onFinish: (ratings: number[]) => void;
    displayType?: "star" | "number";
};

const RatingForm = ({ questions, maxRating = 5, onFinish, displayType = "star" }: RatingFormProps) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [ratings, setRatings] = useState<number[]>(Array(questions.length).fill(0))

    const handleRating = (rating: number) => {
        const newRatings = [...ratings]
        newRatings[currentStep] = rating
        setRatings(newRatings)
    }

    const handlePrevious = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1)
    }

    const handleNext = () => {
        if (currentStep < questions.length - 1) setCurrentStep(currentStep + 1)
    }

    const handleFinish = () => {
        onFinish(ratings)
    }

    const currentQuestion = questions[currentStep]

    return (
        <div className="my-[150px] w-full max-w-xl mx-auto space-y-4 p-4">
            <div className="text-center text-sm text-gray-500">
                Question {currentStep + 1} of {questions.length}
            </div>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{currentQuestion?.text}</CardTitle>
                    {currentQuestion?.description && (
                        <CardDescription>{currentQuestion.description}</CardDescription>
                    )}
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <StarRating
                        value={ratings[currentStep] ?? 0}
                        maxRating={maxRating}
                        onRate={handleRating}
                        displayType={displayType}
                    />
                    <div className="text-primary font-medium">
                        {(ratings[currentStep] ?? 0) > 0
                            ? `You rated this ${ratings[currentStep] ?? 0} out of ${maxRating} stars`
                            : "Select a rating"}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <HiButton onClick={handlePrevious} disabled={currentStep === 0} variant="outline" title="Previous" />
                {currentStep === questions.length - 1 ? (
                    <HiButton onClick={handleFinish} title="Finish" />
                ) : (
                    <HiButton onClick={handleNext} endIcon={ArrowRight} title="Next" />
                )}
            </div>
        </div>
    )
};

export default RatingForm;