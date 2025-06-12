"use client"; // If you're using App Router in Next.js 13+

import React from "react";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

interface IconWithShapeProps {
  iconName: IconName;
  size?: number;
}

const IconWithShape: React.FC<IconWithShapeProps> = ({ iconName, size=52 }) => {
  // const LucideIcon = Icons[iconName];
  const LucideIcon = Icons[iconName] as React.ComponentType<{ size: number }>;


  return (
    <div className="fbox-ico ico-50 mb-[20px] xsm:mb-[20px]">
      <div className="shape-ico color--theme relative inline-block m-[0_auto]">
        <div className="relative z-[2] top-[-5px] left-[-5px]">
          <LucideIcon size={size} />
        </div>

        {/* Shape behind the icon */}
        <svg
          className="w-[130px] h-[130px] top-[-35px] left-[calc(50%_-_60px)]
                     lg:w-[110px] lg:h-[110px] lg:top-[-30px] lg:left-[calc(50%_-_55px)]
                     md:w-[95px] md:h-[95px] md:top-[-25px] md:left-[calc(50%_-_50px)]
                     sm:w-[125px] sm:h-[125px] sm:top-[-35px] sm:left-[calc(50%_-_65px)]
                     xsm:w-[120px] xsm:h-[120px] xsm:top-[-35px] xsm:left-[calc(50%_-_60px)]
                     absolute z-[1]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
};

export default IconWithShape;
