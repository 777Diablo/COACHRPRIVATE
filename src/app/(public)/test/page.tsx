"use client";

import RatingForm, { Question } from "./RatingForm";
import RatingFormPair from "./RatingFormPair";

const questionsSingle: Question[] = [
  {
    id: 1,
    text: "How do you rate our service?",
    description: "Let us know your experience with our service.",
  },
  {
    id: 2,
    text: "How do you rate our product quality?",
    description: "Your opinion matters.",
  },
  {
    id: 3,
    text: "How do you rate our customer support?",
    description: "We value your feedback.",
  },
];

const questionsPair: Question[][] = [
  [
    {
      id: 1,
      text: "How do you rate our service?",
      description: "Let us know your experience with our service.",
    },
    {
      id: 2,
      text: "How do you rate our product quality?",
      description: "Your opinion matters.",
    },
  ],
  [
    {
      id: 3,
      text: "How do you rate our customer support?",
      description: "We value your feedback.",
    },
    {
      id: 4,
      text: "How do you rate our website experience?",
      description: "Help us improve our website.",
    },
  ],
];

const HomePage = () => {
  const handleSingleFinish = (ratings: number[]) => {
    console.log("Final Ratings (Single):", ratings);
  };

  const handlePairFinish = (ratings: number[]) => {
    console.log("Final Ratings (Pair):", ratings);
  };

  return (
    <div className="space-y-8 pt-[150px]">
      <h1 className="text-center text-2xl font-bold">Single Rating Form</h1>
      <RatingForm
        questions={questionsSingle}
        maxRating={5}
        onFinish={handleSingleFinish}
      />

      <h1 className="text-center text-2xl font-bold">
        Pair Rating Form with 5 STars
      </h1>
      <RatingFormPair
        questionPairs={questionsPair}
        maxRating={5}
        onFinish={handleSingleFinish}
        displayType="number"
      />

      <h1 className="text-center text-2xl font-bold">
        Pair Rating Form With 3 Stars
      </h1>
      <RatingFormPair
        questionPairs={questionsPair}
        maxRating={3}
        onFinish={handlePairFinish}
      />
    </div>
  );
};

export default HomePage;
