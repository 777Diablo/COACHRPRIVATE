// Define DISC Personality Types
type DISCType = "D" | "I" | "S" | "C";

// Structure of a DISC question
export interface DISCQuestion {
  id: number;
  trait: DISCType;
  statement: string;
}

// disc max point/rating for each question
export const DISC_MAX_POINTS_PER_QUESTION = 5;
export const DISC_MIN_POINTS_PER_QUESTION = 1;

// Define the DISC Questions
export const DISC_QUESTIONS: DISCQuestion[] = [
  { id: 1, trait: "D", statement: "I am assertive, demanding, and decisive." },
  { id: 2, trait: "D", statement: "I enjoy doing multiple tasks at once." },
  {
    id: 3,
    trait: "D",
    statement: "I thrive in a challenge-based environment.",
  },
  {
    id: 4,
    trait: "D",
    statement: "I think about tasks above others or myself.",
  },
  {
    id: 5,
    trait: "D",
    statement: "I am motivated by accomplishment and authority.",
  },

  { id: 6, trait: "I", statement: "I enjoy influencing and inspiring people." },
  { id: 7, trait: "I", statement: "I am optimistic about others." },
  { id: 8, trait: "I", statement: "I tend to be the life of the party." },
  { id: 9, trait: "I", statement: "I think about motivating people." },
  {
    id: 10,
    trait: "I",
    statement: "I am motivated by recognition and approval.",
  },

  {
    id: 11,
    trait: "S",
    statement: "I thrive in consistent environments over changing ones.",
  },
  { id: 12, trait: "S", statement: "I prefer specifics over generalizations." },
  { id: 13, trait: "S", statement: "I enjoy small groups of people." },
  {
    id: 14,
    trait: "S",
    statement: "I prefer being a member of a team over leading the team.",
  },
  { id: 15, trait: "S", statement: "I am motivated by stability and support." },

  { id: 16, trait: "C", statement: "I typically do not take big risks." },
  { id: 17, trait: "C", statement: "I love tasks, order, and details." },
  { id: 18, trait: "C", statement: "I am right most of the time." },
  { id: 19, trait: "C", statement: "I comply with clearly defined rules." },
  {
    id: 20,
    trait: "C",
    statement: "I am motivated by quality and correctness.",
  },
];

// Store user responses: question ID mapped to a score (1-5)
// type DISCResponses = Record<number, 1 | 2 | 3 | 4 | 5>;
export type DISCResponses = Record<number, number>;
export type DISCResults = Record<DISCType, number>;
/**
 * Calculates DISC scores based on user responses.
 * @param responses - A record of question IDs and their corresponding scores.
 * @returns An object with DISC scores.
 */
export function calculateDISCProfile(responses: DISCResponses): DISCResults {
  return DISC_QUESTIONS.reduce(
    (scores, question) => {
      const responseScore = responses[question.id] ?? 0; // Default to 0 if no response
      return {
        ...scores,
        [question.trait]: scores[question.trait] + responseScore,
      };
    },
    { D: 0, I: 0, S: 0, C: 0 },
  );
}

/**
 * Determines the dominant DISC personality type based on scores.
 * @param scores - An object containing DISC scores.
 * @returns The highest-scoring DISC type(s).
 */
export function getDISCProfile(scores: Record<DISCType, number>): string {
  const highestScore = Math.max(scores.D, scores.I, scores.S, scores.C);
  return Object.entries(scores)
    .filter(([_, score]) => score === highestScore)
    .map(([trait]) => trait)
    .join(""); // Returns single or multiple traits if tied
}
