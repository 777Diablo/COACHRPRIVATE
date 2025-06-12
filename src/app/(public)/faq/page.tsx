"use client";

import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaqHero from "./faqHero";
import FaqAccordion from "./faqAccordion";
import FaqContact from "./faqContact";
import { useState, useRef, useEffect } from "react";

import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const faqCategories = {
  general: {
    title: "General",
    questions: [
      {
        question: "I have questions. How can I know more about a service?",
        answer:
          "To know more about a service, read service related FAQs or Contact Us.",
      },
      {
        question: "Can I upgrade from Standard to Premium??",
        answer:
          "Yes, upgrades are possible. Contact us at intervieweecoach@thecoachr.com or WhatsApp for details.",
      },
      {
        question:
          "There is an issue with the payment gateway. Whom to contact?",
        answer:
          "Contact us at intervieweecoach@thecoachr.com or WhatsApp with details of the problem faced by you. We will resolve it and confirm as early as possible.",
      },
    ],
  },
  mockInterview: {
    title: "Mock Interviews",
    questions: [
      {
        question: "What is a Mock Interview?",
        answer:
          "It is a practice interview designed to simulate a real job interview. It allows you to experience the interview process, practice your responses, and receive feedback to improve your performance.",
      },
      {
        question:
          "How will the mock interview help me if I have no prior job experience?",
        answer:
          "Mock interviews help you build confidence, practice answering common interview questions, and get comfortable with the interview environment. You’ll also learn how to highlight skills from your academic, volunteer, or internship experiences.",
      },
      {
        question: "Do I need to prepare for the mock interview?",
        answer:
          "Yes, it’s recommended to treat the mock interview seriously by preparing answers to common questions. The mock interview is more effective if you treat it like a real one.",
      },
      {
        question:
          "Will the coach help me with specific questions for my field or industry?",
        answer:
          "Yes, your coach can tailor the coaching to match the industry or role you’re targeting. You’ll practice responses that are relevant to your chosen field.",
      },
      {
        question: "How long will be Mock Interview session?",
        answer:
          "Total duration of the session will be 60 minutes. The session will cater to Mock Interview & Coaching. You will receive the feedback on Mock Interview & Coaching in 24 hours after the session.",
      },
      {
        question: "Mock Interview is available at which locations?",
        answer:
          "This program is available only through Online mode. In-person Mock Interview (with Psychometrics) are available Online and In-person at Delhi, Mumbai & Bhubaneswar.",
      },
      {
        question: "Can I do more than one mock interview session?",
        answer:
          "Yes, you can schedule multiple mock interview sessions to track your progress over time. Subsequent sessions may be purchased at discounted rate. Contact us to avail your discount.",
      },
      {
        question:
          "What if I struggle with confidence or answering certain questions?",
        answer:
          "The coach will provide guidance on how to build confidence and handle tricky questions. You’ll learn techniques to stay calm and composed under pressure.",
      },
      {
        question: "When will I receive the feedback?",
        answer:
          "Feedback is provided within 24 hours after the Mock Interview & Coaching session is over.",
      },
      {
        question:
          "Will the mock interview cover behavioural and situational questions?",
        answer:
          "Yes, the mock interview will typically include behavioural and situational questions that are commonly asked to experienced professionals. You’ll practice framing your past experiences in a way that highlights your leadership, problem-solving, and decision-making skills.",
      },
      {
        question:
          "Will the coach help me with salary negotiations or questions about compensation?",
        answer:
          "Yes, you may include negotiation or salary-related questions as an area where the coach will guide you on how to handle these discussions professionally and confidently.",
      },
      {
        question:
          "Will a mock interview help if I want to switch to a different role or industry?",
        answer:
          "If you're switching careers or industries, the mock interview will help you frame your previous experience in a way that aligns with the new role. Coaches can guide you on how to highlight transferable skills and avoid being too focused on the skills you may no longer use.",
      },
    ],
  },

  psychometrics: {
    title: "Psychometric Assessments",
    questions: [
      {
        question: "What is a Mock Interview (with Psychometrics)?",
        answer:
          "This program offers everything that Mock Interview offers plus Psychometric assessment, which will evaluate aspects like cognitive abilities, personality traits, emotional intelligence, and problem-solving skills. It provides insights into your personality and strengths to enhance interview performance and overall career readiness.",
      },
      {
        question:
          "Mock Interview (with psychometrics) is available at which locations?",
        answer:
          "It is available for Indian and International students and professionals through Online mode and In-person (Only in Delhi, Mumbai, and Bhubaneswar).",
      },
      {
        question: "Should a fresher take psychometric assessment?",
        answer:
          "Psychometric assessments provide valuable insights into your potential, highlighting your strengths and areas for improvement. This is very helpful for Freshers, as it allows to demonstrate your abilities and personality traits, even if you don’t have prior job experience.",
      },
      {
        question:
          "How will the program be delivered? Is it available online or only in-person?",
        answer:
          "The program is available both online and in-person. You can choose the mode that suits you best. If you prefer in-person interviews, sessions will be conducted in Delhi, Mumbai, and Bhubaneswar. The online mode offers the flexibility to participate from anywhere.",
      },
      {
        question:
          "Can I retake the psychometric tests if I’m not satisfied with my results?",
        answer:
          "Psychometric tests are designed to reflect your authentic abilities, so retaking the tests is not recommended. However, feedback from the results can be used to identify areas for improvement, and the coach can guide you on how to develop in those areas.",
      },
      {
        question: "When will I receive the Feedback?",
        answer:
          "You will take the psychometric test before the Mock Interview session with Coach. Feedback is provided within 24 hours after the Mock Interview & Coaching session is over.",
      },
    ],
  },

  resume: {
    title: "ATS-Friendly Resume",
    questions: [
      {
        question: "What is an ATS-friendly resume?",
        answer:
          "An ATS-friendly resume is designed to be easily read by Applicant Tracking Systems (ATS), which filter resumes based on specific keywords and criteria. This ensures your resume reaches human recruiters without formatting issues that might block it.",
      },
      {
        question: "How does an ATS impact my resume?",
        answer:
          "ATS scans resumes for keywords and job-related phrases. Complex formatting, like images or fancy fonts, can prevent ATS from reading your resume, causing it to be rejected. An ATS-friendly resume improves your chances of passing this initial screening.",
      },
      {
        question: "Why do I need an ATS-friendly resume?",
        answer:
          "Many companies use ATS to filter resumes. Without an ATS-friendly format, even well-qualified candidates may be overlooked. This type of resume optimizes your chances of reaching a recruiter.",
      },
      {
        question:
          "How is an ATS-friendly resume different from a regular resume?",
        answer:
          "ATS-friendly resumes prioritize simplicity and clarity, using standard headings and avoiding complex formatting. Regular resumes may focus more on design, which can confuse ATS software.",
      },
      {
        question:
          "What information do I need to provide to build my ATS-friendly resume?",
        answer:
          "To create an ATS-friendly resume, provide details like your work experience, skills, education, certifications, achievements, and any keywords from the job description (if available).",
      },
      {
        question: "How do I know if my resume is ATS-friendly?",
        answer:
          "You can check your resume using ATS scanning tools or contact us to get an ATS friendly resume that follows ATS guidelines and incorporates the right keywords.",
      },
      {
        question:
          "How will you make sure the resume includes the right keywords?",
        answer:
          "We analyze your job description (if available) & your profile and incorporate the relevant keywords to ensure your resume matches what ATS is looking for.",
      },
      {
        question: "Will you personalize my ATS-friendly resume?",
        answer:
          "Yes, we tailor your resume to specific jobs or industries by using relevant keywords and highlighting your most applicable experience.",
      },
      {
        question:
          "Can I use my ATS-friendly resume for multiple job applications?",
        answer:
          "Yes, you can adapt your ATS-friendly resume for different roles by modifying it to match each job description with relevant keywords.",
      },
      {
        question: "How long will it take to create my ATS-friendly resume?",
        answer:
          "Typically, it takes 4-5 business days. Expedited options are available if needed.",
      },
    ],
  },

  videoBasedMockInterview: {
    title: "Video-Based Mock Interview",
    questions: [
      {
        question: "What is a Video-Based Mock Interview?",
        answer:
          "A Video-Based Mock Interview is a self-paced interview simulation where you record responses to pre-set questions. HR professionals evaluate your performance and provide feedback to enhance your interview skills.",
      },
      {
        question: "How does the Video-Based Mock Interview process work?",
        answer:
          "You will be asked a series of pre-recorded questions to which you will respond by recording your answers on video within a set timeframe. Your recorded interview will be reviewed by HR Experts and Feedback will be provided within 24 hours on your performance, including areas for improvement.",
      },
      {
        question: "Do I need to prepare for the video-based mock interview?",
        answer:
          "Yes, it’s recommended to prepare as you would for a real interview by practicing common interview questions. Treat the mock interview seriously to get the most out of the experience.",
      },
      {
        question:
          "Can I re-record my answers if I’m not satisfied with my performance?",
        answer:
          "No, you will not be able to re-record your interview. Just like you would do in real interviews, you are advised to be prepared before you start recording. You may however retake Video-based Mock Interview incorporating feedback from your previous mock session.",
      },
      {
        question:
          "What are the benefits of using a video-based mock interview as a fresher?",
        answer:
          "You can practice speaking clearly, improving your body language, and getting comfortable with answering interview questions in a structured setting. You can assess your performance in a low-pressure environment, building your confidence before real interviews.",
      },
      {
        question:
          "How will Video-based Mock Interview help me get my first job?",
        answer:
          "You will be getting feedback from real-world HR professionals on how to improve your interview performance in zero pressure environment and excel in a real interview.",
      },
    ],
  },

  careerSuccessCoaching: {
    title: "Career Success Coaching",
    questions: [
      {
        question: "What is the Career Success Coaching Program?",
        answer:
          "Our Career Success Coaching program is a personalized coaching service that helps you improve your career strategy, interview skills, and overall professional growth, with insights from psychometric assessments.",
      },
      {
        question: "How does the psychometric assessment help in coaching?",
        answer:
          "The psychometric test analyzes your personality, strengths, and work style, allowing our coaches to provide tailored guidance for career development, interview performance, and workplace success.",
      },
      {
        question: "Who will be my Coach?",
        answer:
          "You will be coached by experienced HR professionals and career experts who provide personalized advice based on your goals and psychometric results.",
      },
      {
        question: "What topics are covered in the Coaching sessions?",
        answer:
          "Topics will be tailored to your needs that you share with us in Registration Form. The session may be Open-ended or Structured based on your requirement.",
      },
      {
        question: "How long is a Career Success Coaching session?",
        answer: "Each Career Success Coaching session will be of 60 minutes.",
      },
      {
        question: "Career Success Coaching is available at which locations?",
        answer:
          "It is available for Indian and International students and professionals through Online mode and In-person (Only in Delhi, Mumbai, and Bhubaneswar).",
      },
      {
        question:
          "Will I receive any feedback or action plan after the Career Success Coaching session?",
        answer:
          "You will receive Individual Development Plan (IDP) which is a personalized action plan based on your Career Success Coaching session and psychometric assessment, helping you improve skills, overcome challenges, and achieve your career goals.",
      },
      {
        question: "Can I take multiple coaching sessions?",
        answer:
          "Absolutely. You can book multiple sessions for ongoing guidance, skill-building, and tracking progress over time. Subsequent sessions will be provided at discounted rate. Contact us to avail your discount.",
      },
      {
        question:
          "Who should seek Career Success Coaching – Fresher or Experienced Professional?",
        answer:
          "Career Success Coaching is designed for both freshers and experienced professionals. Whether you're a fresher looking to kickstart your career with confidence or an experienced professional aiming for growth, leadership, or a career transition. Our personalized guidance will help you succeed at every stage.",
      },
      {
        question: "How do I schedule my coaching session?",
        answer:
          "After purchasing the service, you will receive instructions to guide you through the whole program including scheduling instructions.",
      },
      {
        question: "Will I be able to reschedule a session in case of exigency?",
        answer:
          "You can reschedule your session once. However, the rescheduling request must be made at least 72 hours before the scheduled slot.",
      },
      {
        question: "How are the Coaches assigned?",
        answer:
          "Coaches are assigned by the Admin based on your profile and requirements. The assigned Coach will have relevant industry experience and expertise to provide tailored guidance and feedback.",
      },
      {
        question: "What additional benefits does the Premium Package offer?",
        answer:
          "With premium package, you will get coached by a Senior Coach who will attend to your requirements and guide you with Individual Development Plan (IDP). You will get an extended support from your Coach over email and discounted retake options for tracking progress on Individual Development Plan.",
      },
    ],
  },
};

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("general");

  return (
    <main className="min-h-screen bg-background dark:bg-slate-900">
      <FaqHero />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Mobile/Tablet View: Dropdown Select */}
          <div className="mb-6 lg:hidden">
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-full dark:bg-slate-800 dark:text-slate-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(faqCategories).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop View: Tabs */}
          <div className="hidden lg:block">
            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="space-y-8 "
            >
              <TabsList className="grid w-full grid-cols-6 dark:bg-slate-800 h-16">
                {Object.entries(faqCategories).map(([key, category]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:text-slate-200 dark:data-[state=active]:bg-primary/80"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          
          {Object.entries(faqCategories).map(
            ([key, category]) =>
              activeCategory === key && (
                <div key={key} className="mt-8">
                  <FaqAccordion questions={category.questions} />
                </div>
              )
          )}
        </div>
      </section>
      <FaqContact />
    </main>
  );
}