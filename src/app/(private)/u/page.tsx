"use client";

import React, { useEffect, useState } from 'react';
import Header from './components/dashboard/Header';
import ExperienceOverview from './components/dashboard/ExperienceOverview';
import SkillsSection from './components/dashboard/SkillsSection';
import Sidebar from './components/dashboard/Sidebar';
import { resumeData } from './data/resumeData';
import toast from "react-hot-toast";
import { api } from "@/trpc/react";

const Page = () => {
  const { data: userDetails } = api.user.getOne.useQuery({ id: "me" });
  const userId = userDetails?.id;

  const { data: programs } = api.programEnrollment.getByUserId.useQuery(
    { id: userId! },
    {
      enabled: !!userId,
    }
  );

  const [timeLeft, setTimeLeft] = useState<string>("Loading...");

  useEffect(() => {
    if (!programs || !programs[0]?.scheduledAt) return;

    const targetTime = new Date(programs[0].scheduledAt).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Call immediately

    return () => clearInterval(interval);
  }, [programs]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="text-black p-2">
            Next Scheduled Program in {timeLeft}
          </div>
          <Header 
            name={resumeData.name} 
            title={resumeData.title} 
            contact={resumeData.contact}
            photo={resumeData.photo}
          />
          
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-6">
              <ExperienceOverview 
                timespan={resumeData.experience.timespan}
                years={resumeData.experience.years}
                experienceByType={resumeData.experience.byType}
                experienceByIndustry={resumeData.experience.byIndustry}
              />
              
              <div className="mt-8">
                <h2 className="text-xs font-bold text-[#1e3a5f] mb-2">PERSONAL</h2>
                <SkillsSection 
                  skills={resumeData.skills}
                  tools={resumeData.tools}
                  languages={resumeData.languages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
