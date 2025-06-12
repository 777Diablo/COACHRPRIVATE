import { AvailableTypes, Program } from "../types";

export const programs: Record<string, Program> = {
  "mock-interview-psychometrics": {
    id: "1",
    icon: "Brain",
    slug: "mock-interview-psychometrics",
    title: "Mock Interview (With Psychometrics)",
    subtitle:
      "Maximize Your Job Readiness with a Comprehensive Online Interview Preparation Program",
    description:
      "Get comprehensive feedback on your interview performance through detailed video analysis and expert recommendations.",
    price: "₹1990",
    targetAudience: "Job Seekers, Professionals, Career Transitioners",
    requirements:
      "Updated resume, career goals, professional background details",
    colorScheme: [
      {
        bgColor: "bg-blue-600",
        gradient: "bg-gradient-to-b from-blue-600/10 to-transparent",
        hoverBorderColor: "hover:border-blue-600",
      },
    ],
    whyChooseAttributes: [
      {
        id: "holistic",
        title: "Holistic Approach",
        description:
          "Combines psychometric testing, mock interviews, and personalized coaching for a comprehensive preparation strategy.",
      },
      {
        id: "expert-guidance",
        title: "Expert Guidance",
        description:
          "Learn from seasoned HR professionals who bring industry-specific insights and expertise to your preparation.",
      },
      {
        id: "in-depth-feedback",
        title: "In-Depth Feedback",
        description:
          "Receive thorough, actionable feedback that you can immediately implement to improve your performance.",
      },
    ],
    features: [
      {
        title: "Expert Review",
        description: "Get detailed feedback from industry professionals",
      },
      {
        title: "Video Analysis",
        description:
          "In-depth analysis of your body language and communication",
      },
      {
        title: "Written Report",
        description: "Comprehensive written feedback and improvement areas",
      },
      {
        title: "Action Plan",
        description: "Personalized improvement roadmap",
      },
    ],
    highlights: [
      "Comprehensive Psychological Insights",
      "Personalized Interview Strategy",
      "Detailed Performance Feedback",
    ],
    programType: "hybrid" as AvailableTypes,
    modes: {
      online: {
        pricing: {
          standard: {
            inr: "₹1,990",
            usd: "$24.99",
          },
          premium: {
            inr: "₹3,990",
            usd: "$49.99",
          },
        },
      },
      inPerson: {
        pricing: {
          standard: {
            inr: "₹2,990",
            usd: "$36.99",
          },
          premium: {
            inr: "₹5,990",
            usd: "$74.99",
          },
        },
      },
    },
    programDetails: {
      commonDetails: [
        {
          icon: "Brain",
          title: "Psychometric Assessment",
          description:
            "Understand your personality and cognitive traits. Leverage insights for comprehensive improvement.",
        },
        {
          icon: "Users",
          title: "Mock Interview",
          description:
            "Engage in One-on-One interview simulation with an industry HR expert.",
        },
        {
          icon: "CheckCircle",
          title: "Personalized Coaching",
          description:
            "Get immediate tailored coaching based on your performance on honing your interview skills & boost your confidence",
        },
        {
          icon: "MessageSquare",
          title: "Detailed Feedback",
          description:
            "Receive feedback on your performance with expert guidance on improvement areas within 24 hours",
        },
      ],
      premiumDetails: [
        {
          icon: "Star",
          title: "Extended Support",
          description: "15-days extended guidance after mock session",
          premium: true,
        },
      ],
    },
  },

  "mock-interview-online": {
    id: "2",
    icon: "Video",
    slug: "mock-interview-online",
    title: "Mock Interview",
    subtitle:
      "Maximize Your Job Readiness with a Comprehensive Online Interview Preparation Program",
    description:
      "Comprehensive online mock interview experience with expert interviewers providing detailed, actionable feedback to enhance interview performance and confidence",
    price: "₹1790",
    targetAudience: "Job Seekers, Students, Professionals",
    requirements: "Updated resume, webcam, stable internet connection",
    colorScheme: [
      {
        bgColor: "bg-purple-600",
        gradient: "bg-gradient-to-b from-purple-600/10 to-transparent",
        hoverBorderColor: "hover:border-purple-600",
      },
    ],
    whyChooseAttributes: [
      {
        id: "flexible-practice",
        title: "Flexible Practice",
        description:
          "Convenient online platform allowing you to practice interviews from anywhere, anytime.",
      },
      {
        id: "time-management",
        title: "Response Optimization",
        description:
          "Learn to structure and deliver concise, impactful responses within limited timeframes.",
      },
      {
        id: "self-review",
        title: "Continuous Improvement",
        description:
          "Record and analyze your interview performances to identify and work on improvement areas.",
      },
    ],
    features: [
      {
        title: "Personality Analysis",
        description: "Comprehensive personality trait assessment",
      },
      {
        title: "Cognitive Assessment",
        description: "Evaluation of problem-solving abilities",
      },
      {
        title: "Detailed Report",
        description: "In-depth analysis of your results",
      },
      {
        title: "Career Guidance",
        description: "Personalized career path recommendations",
      },
    ],
    highlights: [
      "Real Interview Simulation",
      "Expert Feedback",
      "Performance Improvement",
    ],
    programType: "online-only" as AvailableTypes,
    modes: {
      online: {
        pricing: {
          standard: {
            inr: "₹1,790",
            usd: "$22.99",
          },
          premium: {
            inr: "₹3,490",
            usd: "$43.99",
          },
        },
      },
      inPerson: {
        pricing: {
          standard: {
            inr: "₹2,990",
            usd: "$38.99",
          },
          premium: {
            inr: "₹5,490",
            usd: "$69.99",
          },
        },
      },
    },
    programDetails: {
      commonDetails: [
        {
          icon: "Users",
          title: "Mock Interview",
          description:
            "Engage in One-on-One interview simulation with an industry HR expert.",
        },
        {
          icon: "Users",
          title: "Personalized Coaching",
          description:
            "Get immediate tailored coaching based on your performance on honing your interview skills & boost your confidence.",
        },
        {
          icon: "Users",
          title: "Detailed Feedback",
          description:
            "Receive feedback on your performance with expert guidance on improvement areas within 24 hours.",
        },
      ],
      premiumDetails: [
        {
          icon: "Star",
          title: "Extended Support",
          description: "Follow-up coaching and detailed insights",
          premium: true,
        },
      ],
    },
  },

  "video-based-mock-interview": {
    id: "3",
    icon: "CheckCircle",
    slug: "video-based-mock-interview",
    title: "Video-Based Mock Interviews",
    subtitle: "Virtual Practice, Real Results. Practice anytime, anywhere.",
    description:
      "Advanced video interview preparation utilizing cutting-edge AI technology to provide comprehensive performance insights, communication effectiveness, and strategic improvement recommendations",
    price: "₹2290",
    targetAudience: "Job Seekers, Professionals, Tech-Savvy Candidates",
    requirements: "Webcam, quiet environment, professional attire",
    colorScheme: [
      {
        bgColor: "bg-orange-600",
        gradient: "bg-gradient-to-b from-orange-600/10 to-transparent",
        hoverBorderColor: "hover:border-orange-600",
      },
    ],
    whyChooseAttributes: [
      {
        id: "anytime-practice",
        title: "Practice Anytime, Anywhere",
        description:
          "Real-time interview simulation without need for prior scheduling.",
      },
      {
        id: "response-quality",
        title: "Improve Response Quality",
        description:
          "Learn to structure and deliver precise answers within stipulated time constraints.",
      },
      {
        id: "self-assessment",
        title: "Review & Improve",
        description:
          "Revisit recorded sessions to analyze and enhance your interview performance.",
      },
    ],
    features: [
      {
        title: "Professional Feedback",
        description: "Suggestions from hiring experts",
      },
      {
        title: "ATS Optimization",
        description:
          "Make your resume compatible with Applicant Tracking Systems",
      },
      {
        title: "Custom Template",
        description: "Choose from industry-specific designs",
      },
      {
        title: "Cover Letter Assistance",
        description: "Optional personalized cover letter creation",
      },
    ],
    highlights: [
      "AI-Driven Analysis",
      "Comprehensive Performance Metrics",
      "Advanced Insights",
    ],
    programType: "hybrid" as AvailableTypes,
    modes: {
      online: {
        pricing: {
          standard: {
            inr: "₹2,290",
            usd: "$29.99",
          },
          premium: {
            inr: "₹4,490",
            usd: "$56.99",
          },
        },
      },
      inPerson: {
        pricing: {
          standard: {
            inr: "₹3,990",
            usd: "$50.99",
          },
          premium: {
            inr: "₹6,990",
            usd: "$89.99",
          },
        },
      },
    },
    programDetails: {
      commonDetails: [
        {
          icon: "Video",
          title: "Mock Interview",
          description:
            "Face video-based mock interview by recording your responses, simulating real interview scenario",
        },
        {
          icon: "MessageSquare",
          title: "Feedback from Expert",
          description:
            "Know your performance by getting feedback on strengths, improvement areas and guidance on way forward",
        },
        {
          icon: "CheckCircle",
          title: "Access for 15 Days",
          description:
            "Revisit your recorded mock interview to review your performance & track improvement",
        },
      ],
      premiumDetails: [
        {
          icon: "Star",
          title: "Extended Insights",
          description: "Comprehensive performance breakdown",
          premium: true,
        },
      ],
    },
  },

  "ats-friendly-resume": {
    id: "4",
    icon: "FileText",
    slug: "ats-friendly-resume",
    title: "ATS-Friendly Resume",
    subtitle: "The resume that gets you noticed—by systems and recruiters",
    description:
      "Comprehensive resume transformation service that ensures maximum visibility through advanced ATS optimization, strategic content design, and professional formatting",
    price: "₹2490",
    targetAudience: "Job Seekers, Professionals, Career Changers",
    requirements:
      "Current resume, job descriptions, professional background details",
    colorScheme: [
      {
        bgColor: "bg-green-600",
        gradient: "bg-gradient-to-b from-green-600/10 to-transparent",
        hoverBorderColor: "hover:border-green-600",
      },
    ],
    whyChooseAttributes: [
      {
        id: "proven-success",
        title: "Proven Success",
        description:
          "Based on industry best practices and ATS algorithms to maximize resume visibility.",
      },
      {
        id: "personalized-service",
        title: "Personalized Service",
        description:
          "Tailored resume creation that highlights your unique professional strengths and experiences.",
      },
      {
        id: "fast-turnaround",
        title: "Fast Turnaround",
        description:
          "Quick delivery within 4-5 business days, ensuring you can apply to opportunities promptly.",
      },
    ],
    features: [
      {
        title: "Live Feedback",
        description: "Get instant feedback during the session",
      },
      {
        title: "Expert Matching",
        description: "Connect with professionals from your industry",
      },
      {
        title: "Performance Review",
        description:
          "Detailed analysis of your strengths and areas for improvement",
      },
      {
        title: "Follow-up Plan",
        description: "Structured plan for continued improvement",
      },
    ],
    highlights: [
      "100% ATS Compatibility",
      "Professional Design",
      "Keyword Optimization",
    ],
    programType: "in-person-only" as AvailableTypes,
    modes: {
      online: {
        pricing: {
          standard: {
            inr: "₹2,490",
            usd: "$31.99",
          },
          premium: {
            inr: "₹4,990",
            usd: "$62.99",
          },
        },
      },
      inPerson: {
        pricing: {
          standard: {
            inr: "₹3,990",
            usd: "$50.99",
          },
          premium: {
            inr: "₹6,990",
            usd: "$89.99",
          },
        },
      },
    },
    programDetails: {
      commonDetails: [
        {
          icon: "FileText",
          title: "ATS-Friendly Resume",
          description:
            "Resume tailored to pass through Applicant Tracking Systems",
        },
        {
          icon: "PenTool",
          title: "Professional Design",
          description:
            "Clean, structured, and well-organized resume that makes strong first impression",
        },
        {
          icon: "Check",
          title: "Keyword Optimization",
          description:
            "Industry-specific keywords and phrases to increase the likelihood of getting shortlisted",
        },
      ],
      premiumDetails: [
        {
          icon: "Star",
          title: "Expert Guidance",
          description:
            "Receive tips and advice on how to further improve your chances to get shortlisted for your target role",
          premium: true,
        },
      ],
    },
  },

  "career-success-coaching": {
    id: "5",
    icon: "Briefcase",
    slug: "career-success-coaching",
    title: "Career Success Coaching",
    subtitle:
      "Personalized career guidance aligned with your personality, potential & expertise",
    description:
      "Comprehensive career development program combining personality assessment, expert coaching, and strategic planning to accelerate your professional growth and success",
    price: "₹3990",
    targetAudience:
      "Early Career Professionals, Mid-Level Managers, Career Transitioners",
    requirements:
      "Current resume, career goals documentation, willingness to engage in self-assessment",
    colorScheme: [
      {
        bgColor: "bg-indigo-600",
        gradient: "bg-gradient-to-b from-indigo-600/10 to-transparent",
        hoverBorderColor: "hover:border-indigo-600",
      },
    ],
    whyChooseAttributes: [
      {
        id: "personalized-approach",
        title: "Personalized Approach",
        description:
          "Tailored coaching strategy based on your unique personality traits, skills, and career aspirations.",
      },
      {
        id: "expert-mentorship",
        title: "Expert Mentorship",
        description:
          "Access to experienced career coaches with proven track records in professional development.",
      },
      {
        id: "comprehensive-development",
        title: "Comprehensive Development",
        description:
          "Holistic approach covering personality assessment, skill development, and career planning.",
      },
    ],
    features: [
      {
        title: "Personality Assessment",
        description:
          "In-depth psychometric evaluation of your strengths and traits",
      },
      {
        title: "Career Roadmap",
        description: "Customized development plan aligned with your goals",
      },
      {
        title: "Skill Gap Analysis",
        description: "Detailed assessment of current vs required competencies",
      },
      {
        title: "Progress Tracking",
        description: "Regular monitoring and adjustment of development plans",
      },
    ],
    highlights: [
      "Personalized Career Strategy",
      "Expert Career Coaching",
      "Long-term Growth Planning",
    ],
    programType: "hybrid" as AvailableTypes,
    modes: {
      online: {
        pricing: {
          standard: {
            inr: "₹3,990",
            usd: "$49.99",
          },
          premium: {
            inr: "₹7,990",
            usd: "$99.99",
          },
        },
      },
      inPerson: {
        pricing: {
          standard: {
            inr: "₹5,990",
            usd: "$74.99",
          },
          premium: {
            inr: "₹9,990",
            usd: "$124.99",
          },
        },
      },
    },
    programDetails: {
      commonDetails: [
        {
          icon: "Brain",
          title: "Psychometric Assessment",
          description:
            "Discover your personality and cognitive traits to unlock actionable insights for holistic growth",
        },
        {
          icon: "Users",
          title: "Personalised Coaching",
          description:
            "Benefit from one-on-one sessions with seasoned industry experts to achieve significant career breakthroughs",
        },
        {
          icon: "Target",
          title: "Individual Development Plan",
          description:
            "Receive tailored career road map aligned with your strengths, competencies, and psychometric results",
        },
        {
          icon: "TrendingUp",
          title: "Performance Enhancement",
          description:
            "Boost your workplace efficiency and professional impact through targeted strategies",
        },
      ],
      premiumDetails: [
        {
          icon: "Star",
          title: "Extended Support",
          description: "3 months of post-program email support and guidance",
          premium: true,
        },
      ],
    },
  },
};
