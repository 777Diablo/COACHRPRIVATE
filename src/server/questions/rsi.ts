/**
 * RATIONAL STYLE INVENTORY (RSI)
 * id - question no.
 * a - Statement A
 * b - Statement B
 * categoryA - Category A
 * categoryB - Category B
 */

export const RSI_MAX_POINTS_PER_QUESTION = 3;
export const RSI_MIN_POINTS_PER_QUESTION = 0;

type CareerCategory = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";

export type RSIQuestion = {
  id: number;
  a: string;
  b: string;
  categoryA: CareerCategory;
  categoryB: CareerCategory;
};

export const RSI_QUESTIONS: RSIQuestion[] = [
  {
    id: 1,
    a: "I will only be satisfied with a high standard of living",
    b: "I wish to have considerable influence over other people",
    categoryA: "A",
    categoryB: "B",
  },
  {
    id: 2,
    a: "I only feel satisfied if the output of my job has real value in itself",
    b: "I want to be an expert in the things I do",
    categoryA: "C",
    categoryB: "D",
  },
  {
    id: 3,
    a: "I want to use my creative abilities in my work",
    b: "It is especially important to me that I work with people I like",
    categoryA: "E",
    categoryB: "F",
  },
  {
    id: 4,
    a: "I would obtain particular satisfaction by being able to freely choose what I do",
    b: "I want to make quite sure that I am financially secure",
    categoryA: "G",
    categoryB: "H",
  },
  {
    id: 5,
    a: "I enjoy feeling that people look up to me",
    b: "Not to put to fine a point on it, I want to be wealthy",
    categoryA: "I",
    categoryB: "A",
  },
  {
    id: 6,
    a: "I want a substantial leadership role",
    b: "I want to do a job that is meaningful to me, even though it may not gain tangible rewards",
    categoryA: "B",
    categoryB: "C",
  },
  {
    id: 7,
    a: "I want to feel I have gained hard won expertise",
    b: "I want to create things which people can associate with me alone",
    categoryA: "D",
    categoryB: "E",
  },
  {
    id: 8,
    a: "I seek social relationships with other people in my work",
    b: "I would get satisfaction from deciding how I spend my time",
    categoryA: "F",
    categoryB: "G",
  },
  {
    id: 9,
    a: "I will not be content unless I have substantial material possessions",
    b: "I want to demonstrate to my own satisfaction that I really know my area of work",
    categoryA: "A",
    categoryB: "D",
  },
  {
    id: 10,
    a: "I want my work to be part of my search for meaning in life",
    b: "I want the things I produce to carry my name",
    categoryA: "C",
    categoryB: "E",
  },
  {
    id: 11,
    a: "I would like to be able to afford anything I want",
    b: "A job with long term security really appeals to me",
    categoryA: "A",
    categoryB: "H",
  },
  {
    id: 12,
    a: "I seek a role which gives me substantial influence over others",
    b: "I would enjoy being a specialist in my field",
    categoryA: "B",
    categoryB: "D",
  },
  {
    id: 13,
    a: "It is important that my work makes a positive contribution to the wider community",
    b: "It is important to me to have close relationships with the people I work with",
    categoryA: "C",
    categoryB: "F",
  },
  {
    id: 14,
    a: "I want my personal creativity to be used extensively at work",
    b: "I would prefer to be my own boss",
    categoryA: "E",
    categoryB: "G",
  },
  {
    id: 15,
    a: "Close relationships with people at work would give me particular satisfaction",
    b: "I want to look ahead in my life and know that I will always be OK",
    categoryA: "F",
    categoryB: "H",
  },
  {
    id: 16,
    a: "I want to be able to spend money freely",
    b: "I want to be genuinely innovative in my work",
    categoryA: "A",
    categoryB: "E",
  },
  {
    id: 17,
    a: "I want to be in a position where I can tell other people what to do",
    b: "For me, being close to others at work is really important",
    categoryA: "B",
    categoryB: "F",
  },
  {
    id: 18,
    a: "I would like to look upon my career as part of a search for greater meaning in life",
    b: "I want to take full responsibility for my decisions at work",
    categoryA: "C",
    categoryB: "G",
  },
  {
    id: 19,
    a: "I would enjoy a reputation for being a real specialist",
    b: "I would only be relaxed if I was in a secure career",
    categoryA: "D",
    categoryB: "H",
  },
  {
    id: 20,
    a: "I desire the trappings of wealth and success",
    b: "I want to get to know new people through my work",
    categoryA: "A",
    categoryB: "F",
  },
  {
    id: 21,
    a: "I would like a role which gives me control over how others perform",
    b: "It is important that I can choose for myself the task that I undertake",
    categoryA: "B",
    categoryB: "G",
  },
  {
    id: 22,
    a: "I would devote myself to my work if I believed the output would be worthwhile in itself",
    b: "I would take great comfort in knowing how I stand when I retire",
    categoryA: "C",
    categoryB: "H",
  },
  {
    id: 23,
    a: "Having a close relationship with people at work would make it difficult for me to make a career move",
    b: "Being recognised as part of the 'establishment' is important for me",
    categoryA: "F",
    categoryB: "I",
  },
  {
    id: 24,
    a: "I would enjoy being in charge of people and resources",
    b: "I want to create things that no one else has done before",
    categoryA: "B",
    categoryB: "E",
  },
  {
    id: 25,
    a: "I want to do what I believe is important, not simply that which promotes my career",
    b: "I seek public recognition",
    categoryA: "C",
    categoryB: "I",
  },
  {
    id: 26,
    a: "I want to do something distinctively different from others",
    b: "I usually take the safe option",
    categoryA: "E",
    categoryB: "H",
  },
  {
    id: 27,
    a: "I want other people to look to me for leadership",
    b: "Social status is an important motivator for me",
    categoryA: "B",
    categoryB: "I",
  },
  {
    id: 28,
    a: "A high standard of living attracts me",
    b: "I do not wish to be tightly controlled by a boss at work",
    categoryA: "A",
    categoryB: "G",
  },
  {
    id: 29,
    a: "I want my work to carry my own name",
    b: "I seek formal recognition by others of my achievements",
    categoryA: "E",
    categoryB: "I",
  },
  {
    id: 30,
    a: "I prefer to be in charge",
    b: "I would feel concerned if I could not see a way ahead in my career",
    categoryA: "B",
    categoryB: "H",
  },
  {
    id: 31,
    a: "I would enjoy being a person who has valuable specialist knowledge",
    b: "I would get satisfaction from not having to answer to other people",
    categoryA: "D",
    categoryB: "G",
  },
  {
    id: 32,
    a: "I dislike being a cog in a large wheel",
    b: "It would give me satisfaction to have a high status job",
    categoryA: "G",
    categoryB: "I",
  },
];

export type RSIResults = Record<CareerCategory, number>;

// SCORING LOGIC
/**
 * Calculates RSI career scores based on user responses.
 * @param responses - A record of question IDs and their corresponding scores (A and B).
 * @returns An object with career category scores.
 */

export function calculateRSIScores(
  responses: Record<number, { scoreA: number; scoreB: number }>,
): RSIResults {
  return RSI_QUESTIONS.reduce(
    (scores, question) => {
      const response = responses[question.id] ?? { scoreA: 0, scoreB: 0 };

      return {
        ...scores,
        [question.categoryA]: scores[question.categoryA] + response.scoreA,
        [question.categoryB]: scores[question.categoryB] + response.scoreB,
      };
    },
    { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0 },
  );
}

/**
 * Determines the dominant RSI career category based on scores.
 * @param scores - An object containing career category scores.
 * @returns The highest-scoring career category or categories.
 */
// function getRSIProfile(scores: Record<CareerCategory, number>): string {
//   const highestScore = Math.max(...Object.values(scores));
//   return Object.entries(scores)
//     .filter(([_, score]) => score === highestScore)
//     .map(([category]) => category)
//     .join(""); // Returns single or multiple categories if tied
// }
