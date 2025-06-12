// PERSONAL STYLE INVENTORY (PSI)
// id - question no.
// a - Statement A
// b - Statement B
// dimension - Dimension
// Here Statement A corresponds to first dimension and Statement B corresponds to second dimension

/**
Option "a" corresponds to the first dimension in the pair (e.g., I in I/E).
Option "b" corresponds to the second dimension in the pair (e.g., E in I/E).
So the structure ensures that:

(I/E) → "a" contributes to I, "b" contributes to E
(N/S) → "a" contributes to N, "b" contributes to S
(T/F) → "a" contributes to T, "b" contributes to F
(P/J) → "a" contributes to P, "b" contributes to J
 */

// Define the possible dimensions
type DimensionPair =
  | "E/I"
  | "N/S"
  | "T/F"
  | "P/J"
  | "I/E"
  | "S/N"
  | "F/T"
  | "J/P";

// Define the structure of a question
export interface PSIQuestion {
  id: number;
  a: string;
  b: string;
  dimension: DimensionPair;
}

export const PSI_MAX_POINTS_PER_QUESTION = 5;
export const PSI_MIN_POINTS_PER_QUESTION = 0;

// Define the result structure
type ResultKeys = "I" | "E" | "N" | "S" | "T" | "F" | "P" | "J";
export type PSIResults = Record<ResultKeys, number>;

export const PSI_QUESTIONS: PSIQuestion[] = [
  {
    id: 1,
    a: "Making decisions after finding out what others think.",
    b: "Making decisions without consulting others.",
    dimension: "E/I",
  },

  {
    id: 2,
    a: "Being called imaginative or intuitive.",
    b: "Being called factual and accurate.",
    dimension: "N/S",
  },

  {
    id: 3,
    a: "Making decisions about people in organizations based on available data and systematic analysis of situations.",
    b: "Making decisions about people in organizations based on empathy, feelings, and understanding of their needs and values.",
    dimension: "T/F",
  },

  {
    id: 4,
    a: "Allowing commitments to occur if others want to make them.",
    b: "Pushing for definite commitments to ensure they are made.",
    dimension: "P/J",
  },

  {
    id: 5,
    a: "Quiet, thoughtful time alone.",
    b: "Active, energetic time with people.",
    dimension: "I/E",
  },

  {
    id: 6,
    a: "Using methods I know well that are effective to get the job done.",
    b: "Trying to think of new methods of doing tasks when confronted with them.",
    dimension: "S/N",
  },

  {
    id: 7,
    a: "Drawing conclusions based on unemotional logic and step-by-step analysis.",
    b: "Drawing conclusions based on what I feel about life and people from past experiences.",
    dimension: "T/F",
  },

  {
    id: 8,
    a: "Avoiding making deadlines.",
    b: "Setting a schedule and sticking to it.",
    dimension: "P/J",
  },

  {
    id: 9,
    a: "Talking awhile and then thinking to myself.",
    b: "Talking freely for an extended period and thinking to myself at a later time.",
    dimension: "I/E",
  },

  {
    id: 10,
    a: "Thinking about possibilities.",
    b: "Dealing with actualities.",
    dimension: "N/S",
  },

  {
    id: 11,
    a: "Being thought of as a thinking person.",
    b: "Being thought of as a feeling person.",
    dimension: "T/F",
  },

  {
    id: 12,
    a: "Considering every possible angle for a long time before and after making a decision.",
    b: "Getting information I need, considering it for a while, and then making fairly quick, firm decisions.",
    dimension: "P/J",
  },

  {
    id: 13,
    a: "Inner thoughts and feelings others cannot see.",
    b: "Activities and occurrences in which others join.",
    dimension: "I/E",
  },

  {
    id: 14,
    a: "The abstract or theoretical.",
    b: "The concrete or real.",
    dimension: "N/S",
  },

  {
    id: 15,
    a: "Helping others explore their feelings.",
    b: "Helping others make logical decisions.",
    dimension: "F/T",
  },

  {
    id: 16,
    a: "Change and keeping options open.",
    b: "Predictability and knowing in advance.",
    dimension: "P/J",
  },

  {
    id: 17,
    a: "Communicating little of my inner thinking and feelings.",
    b: "Communicating freely my inner thinking and feelings.",
    dimension: "I/E",
  },

  {
    id: 18,
    a: "Possible views of the whole.",
    b: "The factual details available.",
    dimension: "N/S",
  },

  {
    id: 19,
    a: "Using common sense and conviction to make decisions.",
    b: "Using data, analysis, and reason to make decisions.",
    dimension: "F/T",
  },

  {
    id: 20,
    a: "Planning ahead based on projections.",
    b: "Planning as necessities arise, just before carrying out the plans.",
    dimension: "J/P",
  },

  {
    id: 21,
    a: "Meeting new people.",
    b: "Being alone or with one person I know well.",
    dimension: "E/I",
  },

  { id: 22, a: "Ideas.", b: "Facts.", dimension: "N/S" },

  { id: 23, a: "Convictions.", b: "Verifiable conclusions.", dimension: "F/T" },

  {
    id: 24,
    a: "Keeping appointments and notes about commitments in notebooks before and after making a decision.",
    b: "Using appointment books and notebooks as minimally as possible (although I may use them).",
    dimension: "J/P",
  },

  {
    id: 25,
    a: "Discussing a new, unconsidered issue at length in a group.",
    b: "puzzling out issues in my mind, then sharing the results with another person",
    dimension: "E/I",
  },

  {
    id: 26,
    a: "Carrying out carefully laid, detailed plans with precision.",
    b: "Designing plans and structures without necessarily carrying them out.",
    dimension: "S/N",
  },

  { id: 27, a: "Logical people.", b: "Feeling people.", dimension: "T/F" },

  {
    id: 28,
    a: "Being free to do things on the spur of the moment.",
    b: "Knowing well in advance what I am expected to do.",
    dimension: "P/J",
  },

  {
    id: 29,
    a: "Being the center of attention.",
    b: "Being reserved.",
    dimension: "E/I",
  },

  {
    id: 30,
    a: "Imagining the nonexistent.",
    b: "Examining details of the actual.",
    dimension: "N/S",
  },

  {
    id: 31,
    a: "Experiencing emotional situations, discussions, movies.",
    b: "Using my ability to analyze situations.",
    dimension: "F/T",
  },

  {
    id: 32,
    a: "Starting meetings at a prearranged time.",
    b: "Starting meetings when all are comfortable or ready.",
    dimension: "J/P",
  },
];

// SCORING LOGIC
/**
 * Processes all responses and calculates final results in one go.
 * @param responses - An object where keys are question IDs and values are scores for option "a".
 * @returns The final calculated PSI results.
 */
export function calculatePSIResults(
  responses: Record<number, { scoreA: number; scoreB: number }>,
): PSIResults {
  return PSI_QUESTIONS.reduce<PSIResults>(
    (acc, question) => {
      const scoreA = responses[question.id]?.scoreA ?? 0; // Default to 0 if not provided
      const scoreB = responses[question.id]?.scoreB ?? 0; // Ensure the total is always 5
      const [dimA, dimB] = question.dimension.split("/") as [
        ResultKeys,
        ResultKeys,
      ];

      return {
        ...acc,
        [dimA]: acc[dimA] + scoreA,
        [dimB]: acc[dimB] + scoreB,
      };
    },
    { I: 0, E: 0, N: 0, S: 0, T: 0, F: 0, P: 0, J: 0 }, // Initial empty result object
  );
}

/**
 * Determines the personality signature based on the calculated results.
 * @param results - An object containing scores for personality dimensions.
 * @returns A four-letter personality type (e.g., "INTJ", "ESFP").
 */
export function getPersonalitySignature(results: PSIResults): string {
  return (
    (results.E > results.I ? "E" : "I") +
    (results.N > results.S ? "N" : "S") +
    (results.T > results.F ? "T" : "F") +
    (results.J > results.P ? "J" : "P")
  );
}
