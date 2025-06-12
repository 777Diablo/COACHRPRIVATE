import React from 'react';

interface SkillItem {
  name: string;
  level: number;
  experience: string;
}

interface SkillsSectionProps {
  skills: SkillItem[];
  tools: SkillItem[];
  languages: SkillItem[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, tools, languages }) => {
  // Function to render skill level indicators
  const renderLevelIndicators = (level: number) => {
    const maxLevel = 5;
    const indicators = [];
    
    for (let i = 1; i <= maxLevel; i++) {
      const bgColor = i <= level ? getLevelColor(level) : 'bg-gray-200';
      indicators.push(
        <div 
          key={i} 
          className={`w-6 h-4 ${bgColor} mx-0.5`}
        ></div>
      );
    }
    
    return (
      <div className="flex">{indicators}</div>
    );
  };
  
  // Function to get color based on level
  const getLevelColor = (level: number) => {
    if (level >= 5) return 'bg-green-500';
    if (level >= 4) return 'bg-green-400';
    if (level >= 3) return 'bg-yellow-400';
    if (level >= 2) return 'bg-yellow-300';
    return 'bg-red-300';
  };
  
  // Function to get text for experience level
  const getExperienceText = (experience: string) => {
    return experience;
  };
  
  return (
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-4">
      {/* Skills Section */}
      <div className="bg-gray-50  rounded-lg overflow-hidden">
        <div className="bg-[#1e3a5f] text-white p-2 text-center">
          <h3 className="font-medium">Skills</h3>
        </div>
        <div className="p-2">
          <table className="w-full text-xs/4">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-2 font-medium text-gray-600">Skill</th>
                <th className="text-center p-2 font-medium text-gray-600">Experience</th>
                <th className="text-center p-2 font-medium text-gray-600">Yrs Level</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="p-2 text-[#1e3a5f] font-medium">{skill.name}</td>
                  <td className="p-2 text-center text-gray-600">{getExperienceText(skill.experience)}</td>
                  <td className="p-2">
                    <div className="flex justify-center">
                      {renderLevelIndicators(skill.level)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Tools Section */}
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="bg-[#1e3a5f] text-white p-2 text-center">
          <h3 className="font-medium">Tools</h3>
        </div>
        <div className="p-2">
          <table className="w-full text-xs/4">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-2 font-medium text-gray-600">Tool</th>
                <th className="text-center p-2 font-medium text-gray-600">Experience</th>
                <th className="text-center p-2 font-medium text-gray-600">Yrs Level</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="p-2 text-[#1e3a5f] font-medium">{tool.name}</td>
                  <td className="p-2 text-center text-gray-600">{getExperienceText(tool.experience)}</td>
                  <td className="p-2">
                    <div className="flex justify-center">
                      {renderLevelIndicators(tool.level)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Languages Section */}
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="bg-[#1e3a5f] text-white p-2 text-center">
          <h3 className="font-medium">Language</h3>
        </div>
        <div className="p-2">
          <table className="w-full text-xs/4">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-2 font-medium text-gray-600">Skill</th>
                <th className="text-center p-2 font-medium text-gray-600">Experience</th>
                <th className="text-center p-2 font-medium text-gray-600">Yrs Level</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((language, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="p-2 text-[#1e3a5f] font-medium">{language.name}</td>
                  <td className="p-2 text-center text-gray-600">{getExperienceText(language.experience)}</td>
                  <td className="p-2">
                    <div className="flex justify-center">
                      {renderLevelIndicators(language.level)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;