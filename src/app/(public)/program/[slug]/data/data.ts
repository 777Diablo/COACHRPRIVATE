import { Program } from "../types";

export const programs = {
  // export const programs: Record<string, Program> = {
  'video-based-interview': {
    slug: 'video-based-interview',
    title: "Video-Based Interview",
    subtitle: "Prepare for your interview with 1:1 feedback",
    price: "₹1990",
    duration: "48 hours turnaround",
    format: "Video Recording & Review",
    requirements: "Basic knowledge of your field",
    targetAudience: "Aspiring Professionals, Students",
    description: "Get comprehensive feedback on your interview performance through detailed video analysis and expert recommendations.",
    features: [
      {
        title: "Expert Review",
        description: "Get detailed feedback from industry professionals"
      },
      {
        title: "Video Analysis",
        description: "In-depth analysis of your body language and communication"
      },
      {
        title: "Written Report",
        description: "Comprehensive written feedback and improvement areas"
      },
      {
        title: "Action Plan",
        description: "Personalized improvement roadmap"
      }
    ]
  },
  'video-call-interview': {
    slug: 'video-call-interview',
    title: "Video Call Interview",
    subtitle: "Real-time interview practice with expert feedback",
    price: "₹15",
    duration: "1 hour",
    format: "Live Video Call",
    requirements: "Stable internet connection",
    targetAudience: "Professionals, Job Seekers",
    description: "Practice your interview skills in real-time with industry experts and receive immediate feedback.",
    features: [
      {
        title: "Live Feedback",
        description: "Get instant feedback during the session"
      },
      {
        title: "Expert Matching",
        description: "Connect with professionals from your industry"
      },
      {
        title: "Performance Review",
        description: "Detailed analysis of your strengths and areas for improvement"
      },
      {
        title: "Follow-up Plan",
        description: "Structured plan for continued improvement"
      }
    ]
  },
  'psychometric-test': {
    slug: 'psychometric-test',
    title: "Psychometric Test",
    subtitle: "Understand your professional strengths",
    price: "₹995",
    duration: "45 minutes",
    format: "Online Assessment",
    requirements: "None",
    targetAudience: "All Professionals",
    description: "Gain insights into your personality traits and cognitive abilities through scientifically validated assessments.",
    features: [
      {
        title: "Personality Analysis",
        description: "Comprehensive personality trait assessment"
      },
      {
        title: "Cognitive Assessment",
        description: "Evaluation of problem-solving abilities"
      },
      {
        title: "Detailed Report",
        description: "In-depth analysis of your results"
      },
      {
        title: "Career Guidance",
        description: "Personalized career path recommendations"
      }
    ]
  },
  'mock-interview': {
    slug: 'mock-interview',
    title: "Mock Interview",
    subtitle: "Practice with industry experts",
    price: "₹15",
    duration: "1 hour",
    format: "Live Session",
    requirements: "Basic field knowledge",
    targetAudience: "Job Seekers",
    description: "Get real interview experience with personalized feedback from industry professionals.",
    features: [
      {
        title: "Industry Specific",
        description: "Tailored questions for your field"
      },
      {
        title: "Real-time Feedback",
        description: "Immediate guidance and suggestions"
      },
      {
        title: "Expert Review",
        description: "Detailed performance assessment"
      },
      {
        title: "Improvement Plan",
        description: "Structured development roadmap"
      }
    ]
  }
} as const;