export type FormConfigType = {
  career_success: FormFieldConfig[];
  mock_interview: FormFieldConfig[];
  video_interview: FormFieldConfig[];
  ats_resume: FormFieldConfig[];
};

export const countryOptions = [
  { value: "us", label: "United States" },
  { value: "in", label: "India" },
  { value: "uk", label: "United Kingdom" },
];

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

// Field Configurations
export type FormFieldConfig = {
  name: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "date"
    | "select"
    | "multiselect"
    | "number"
    | "file"
    | "textarea"
    | "objectarray";
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  multiple?: boolean;
  subFields?: FormFieldConfig[];

  min?: number;
  max?: number;
  description?: string;
};

const baseFields: FormFieldConfig[] = [
  { name: "name", type: "text", required: true },
  { name: "email", type: "email", required: true },
  { name: "mobile", type: "tel", required: true },
  { name: "dateOfBirth", type: "date", required: true },
  { name: "gender", type: "select", options: genderOptions, required: true },
  { name: "linkedin", type: "text" },
  { name: "city", type: "text" },
  { name: "country", type: "select", options: countryOptions },
  { name: "image", type: "file", multiple: false },
];

const educationFields: FormFieldConfig[] = [
  { name: "highestQualification", type: "text", required: true },
  { name: "college", type: "text", required: true },
  { name: "specialization", type: "text" },
  // { name: "passingYear", type: "number" },

  {
    name: "certifications",
    type: "objectarray",
    subFields: [
      { name: "name", type: "text", required: true },
      { name: "issuer", type: "text", required: true },
      { name: "issueDate", type: "date", required: true },
      { name: "expiration", type: "date" },
    ],
  },
];

const professionalFields: FormFieldConfig[] = [
  { name: "yearsOfExperience", type: "number", required: true },
  {
    name: "passingYear",
    type: "number",
    min: 1900,
    max: new Date().getFullYear(),
  },
  { name: "currentJobRole", type: "text", required: true },
  { name: "industry", type: "text" },
  { name: "currentEmployer", type: "text" },
  { name: "previousRoles", type: "multiselect" },

  {
    name: "projects",
    type: "objectarray",
    subFields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
    ],
  },
];

const newCareerFields: FormFieldConfig[] = [
  // { name: 'roleLevel', type: 'select', options: roleLevelOptions },
  { name: "functionalExpertise", type: "text" },
  { name: "expertiseDetails", type: "textarea" },
  { name: "currentSalary", type: "number" },

  {
    name: "currentCTC",
    type: "number",
  },
  { name: "expectedCTC", type: "number" },
  { name: "resume", type: "file", required: true },
];

const careerGoalFields: FormFieldConfig[] = [
  { name: "preferredJobRole", type: "text", required: true },
  { name: "targetCompanies", type: "multiselect" },
  { name: "targetLocations", type: "multiselect" },
  { name: "careerObjectives", type: "textarea" },
];

export type FormType =
  | "career_success"
  | "mock_interview"
  | "video_interview"
  | "ats_resume";

export const FORM_CONFIG: Record<FormType, FormFieldConfig[]> = {
  career_success: [
    ...baseFields,
    ...educationFields,
    ...professionalFields,
    ...newCareerFields,
    ...careerGoalFields,
    { name: "improvementAreas", type: "textarea" },
    { name: "strengths", type: "multiselect" },
    { name: "weaknesses", type: "multiselect" },
    { name: "careerChallenges", type: "textarea" },
  ],
  mock_interview: [
    ...baseFields,
    ...educationFields,
    ...professionalFields,
    ...careerGoalFields,

    { name: "expectedCTC", type: "number" },
    { name: "interviewChallenges", type: "textarea" },
  ],
  video_interview: [
    ...baseFields,
    ...professionalFields,
    { name: "targetCompany", type: "text" },
    { name: "expectedCTC", type: "number" },
    { name: "preferredJobRole", type: "text" },
  ],
  ats_resume: [
    ...baseFields,
    ...educationFields,
    ...professionalFields,
    ...careerGoalFields,
    { name: "resumeInstructions", type: "textarea" },
  ],
} as const;
