import React from 'react';
import { CircleChart } from './Charts';

interface ExperienceType {
  name: string;
  percentage: number;
  color: string;
}

interface ExperienceOverviewProps {
  timespan: string;
  years: number;
  experienceByType: ExperienceType[];
  experienceByIndustry: ExperienceType[];
}

const ExperienceOverview: React.FC<ExperienceOverviewProps> = ({ 
  timespan, 
  years, 
  experienceByType, 
  experienceByIndustry 
}) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-[#1e3a5f]">EXPERIENCE</h2>
        <span className="ml-4 text-gray-600">{timespan}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-8 border-[#e6b012] flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-gray-500">#Overall</div>
                <div className="text-3xl font-bold">{years}</div>
                <div className="text-xs text-gray-500">Years</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className='w-full h-full text-sm'>

          
            <CircleChart data={experienceByType} />
          
        </div>
        
        
      </div>
    </div>
  );
};

export default ExperienceOverview;