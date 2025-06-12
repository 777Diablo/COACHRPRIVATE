"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Briefcase,
  GraduationCap,
  Rocket,
  BookOpen,
  Shield,
  Clock,
} from "lucide-react";

interface AudienceCardProps {
  title: string;
  icon: React.ReactNode;
  features: string[];
  accentColor: string;
  delay: number;
}

const AudienceCard: React.FC<AudienceCardProps> = ({
  title,
  icon,
  features,
  accentColor,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className={`group relative rounded-xl border border-neutral-700 bg-neutral-900 p-8 hover:border-${accentColor} transition-all duration-300`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        className={`absolute inset-0 bg-gradient-to-b from-${accentColor} rounded-xl to-transparent`}
      />
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`h-14 w-14 bg-${accentColor} mb-6 flex items-center justify-center rounded-lg`}
        >
          {icon}
        </motion.div>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-2xl font-bold text-white"
        >
          {title}
        </motion.h3>
        <ul className="space-y-3 text-neutral-400">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + index * 0.1 }}
              className="flex items-center"
            >
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const BenefitCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  iconBgColor: string;
}> = ({ title, description, icon, delay, iconBgColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="rounded-xl border border-neutral-700 bg-neutral-900 p-6"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className={`h-12 w-12 ${iconBgColor} mx-auto mb-4 flex items-center justify-center rounded-lg`}
      >
        {icon}
      </motion.div>
      <h4 className="mb-2 text-xl font-semibold text-white">{title}</h4>
      <p className="text-neutral-400">{description}</p>
    </motion.div>
  );
};

const TargetAudience: React.FC = () => {
  const audienceData = [
    {
      title: "Aspiring Professionals",
      icon: <Briefcase className="h-7 w-7 text-white" />,
      features: [
        "Industry-specific interview prep",
        "Career transition guidance",
        "Skill assessment tools",
      ],
      accentColor: "blue-600",
      delay: 0.2,
    },
    {
      title: "Students",
      icon: <GraduationCap className="h-7 w-7 text-white" />,
      features: [
        "Campus placement prep",
        "Internship guidance",
        "Resume building",
      ],
      accentColor: "teal-600",
      delay: 0.4,
    },
    {
      title: "Career Enthusiasts",
      icon: <Rocket className="h-7 w-7 text-white" />,
      features: [
        "Skill enhancement",
        "Leadership training",
        "Career advancement",
      ],
      accentColor: "purple-600",
      delay: 0.6,
    },
  ];

  const benefitsData = [
    {
      title: "Tailored Resources",
      description: "Customized learning materials for your specific needs",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      delay: 0.8,
      iconBgColor: "bg-orange-600",
    },
    {
      title: "Expert Coaching",
      description: "Learn from industry professionals and mentors",
      icon: <Shield className="h-6 w-6 text-white" />,
      delay: 1.0,
      iconBgColor: "bg-green-600",
    },
    {
      title: "Lifetime Access",
      description: "Unlimited access to all learning materials",
      icon: <Clock className="h-6 w-6 text-white" />,
      delay: 1.2,
      iconBgColor: "bg-blue-600",
    },
  ];

  return (
    <section className="bg-neutral-800 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white">Who We Serve</h2>
          <p className="text-xl text-neutral-400">
            Tailored solutions for every career stage
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {audienceData.map((audience, index) => (
            <AudienceCard key={index} {...audience} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
          {benefitsData.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
