// ---------------------------------------------------------
// RSI
// ---------------------------------------------------------
// Career categories based on your scoring function
type CareerCategory = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";

// Structure for an individual response to an RSI question
type RSIResponse = {
  questionId: number;
  scoreA: number;
  scoreB: number;
};

// Structure for total scores per career category
type RSITotalScores = Record<CareerCategory, number>;

// Main document structure for storing a user's RSI test response
type RSIResponseDocument = {
  _id: string; // Unique document ID in MongoDB
  userId: string; // Reference to the user who took the test
  responses: RSIResponse[]; // Array of responses for each question
  totalScores: RSITotalScores; // Aggregated category scores
  createdAt: Date; // Timestamp for when the test was completed
};

// SAMPLE
const RSIRESULT: RSIResponseDocument = {
  _id: "65d8e6a2f0a5b3c1d4567890",
  userId: "65d8e5c9a2f1b3c1d4567889",
  responses: [
    { questionId: 1, scoreA: 3, scoreB: 2 },
    { questionId: 2, scoreA: 5, scoreB: 1 },
    { questionId: 3, scoreA: 4, scoreB: 3 },
  ],
  totalScores: {
    A: 15,
    B: 10,
    C: 7,
    D: 12,
    E: 9,
    F: 5,
    G: 6,
    H: 4,
    I: 3,
  },
  createdAt: new Date("2025-02-14T12:00:00.000Z"),
};

// ---------------------------------------------------------
// PSI
// ---------------------------------------------------------

// Define response structure for a single question
// TODO: Do same as RSI, ScoreA and ScoreB
// TODO: PersonalityType - rename to "outcome" - to match the structure for all
type PSIResponse = {
  questionId: number;
  // score: 0 | 1 | 2 | 3 | 4 | 5;
  scoreA: number;
  scoreB: number;
};

// Define result structure (final scores)
type ResultKeys = "I" | "E" | "N" | "S" | "T" | "F" | "P" | "J";
type PSIResults = Record<ResultKeys, number>;

// Main document structure for storing user PSI responses
type PSIResponseDocument = {
  _id: string;
  userId: string;
  responses: PSIResponse[];
  totalScores: PSIResults;
  personalityType: string; // e.g., "INTJ", "ESFP"
  createdAt: Date;
};

// SAMPLE
const PSIResult: PSIResponseDocument = {
  _id: "65d8e6a2f0a5b3c1d4567891",
  userId: "65d8e5c9a2f1b3c1d4567889",
  responses: [
    { questionId: 1, scoreA: 3, scoreB: 2 },
    { questionId: 2, scoreA: 5, scoreB: 0 },
    { questionId: 3, scoreA: 1, scoreB: 4 },
  ],
  totalScores: {
    I: 12,
    E: 15,
    N: 18,
    S: 10,
    T: 14,
    F: 12,
    P: 16,
    J: 8,
  },
  personalityType: "ENTP",
  createdAt: new Date("2025-02-14T12:00:00.000Z"),
};

// ---------------------------------------------------------
// PSI
// ---------------------------------------------------------

// Define DISC personality traits
type DISCType = "D" | "I" | "S" | "C";

// Store user responses: question ID mapped to a score (1-5)
type DISCResponse = {
  questionId: number;
  score: 1 | 2 | 3 | 4 | 5;
};

// Define DISC scores per trait
type DISCResults = Record<DISCType, number>;

// Main document structure for storing user DISC responses
type DISCResponseDocument = {
  _id: string;
  userId: string;
  responses: DISCResponse[];
  totalScores: DISCResults;
  dominantTraits: string; // e.g., "D", "IS", "C"
  createdAt: Date;
};

// SAMPLE
const DISCResult: DISCResponseDocument = {
  _id: "65d8e6a2f0a5b3c1d4567892",
  userId: "65d8e5c9a2f1b3c1d4567889",
  responses: [
    { questionId: 1, score: 4 },
    { questionId: 2, score: 3 },
    { questionId: 3, score: 5 },
  ],
  totalScores: {
    D: 15,
    I: 12,
    S: 8,
    C: 10,
  },
  dominantTraits: "D",
  createdAt: new Date("2025-02-14T12:00:00.000Z"),
};
