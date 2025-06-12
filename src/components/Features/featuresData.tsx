// import { type Feature } from "@/types";
// const featuresData: Feature[] = [
//   {
//     id: 1,
//     icon: (
//       <svg width="40" height="41" viewBox="0 0 40 41" className="">
//         <path d="M20 0C8.95 0 0 8.95 0 20C0 31.05 8.95 40 20 40C31.05 40 40 31.05 40 20C40 8.95 31.05 0 20 0ZM20 36.36C10.95 36.36 3.64 29.05 3.64 20C3.64 10.95 10.95 3.64 20 3.64C29.05 3.64 36.36 10.95 36.36 20C36.36 29.05 29.05 36.36 20 36.36ZM22.73 10.91H17.27V22.73H22.73V10.91ZM22.73 25.45H17.27V30.91H22.73V25.45Z" />
//       </svg>
//     ),
//     title: "Mock Interviews",
//     paragraph:
//       "1:1 sessions with experienced professionals to simulate real interview scenarios. Get feedback on responses, body language, and technical skills.",
//   },
//   {
//     id: 2,
//     icon: (
//       <svg width="40" height="41" viewBox="0 0 40 41" className="">
//         <path d="M35 10H5C3.9 10 3 10.9 3 12V28C3 29.1 3.9 30 5 30H35C36.1 30 37 29.1 37 28V12C37 10.9 36.1 10 35 10ZM35 28H5V12H35V28ZM20 15C16.69 15 14 17.69 14 21C14 24.31 16.69 27 20 27C23.31 27 26 24.31 26 21C26 17.69 23.31 15 20 15ZM20 25C17.79 25 16 23.21 16 21C16 18.79 17.79 17 20 17C22.21 17 24 18.79 24 21C24 23.21 22.21 25 20 25ZM28 14C28.55 14 29 13.55 29 13C29 12.45 28.55 12 28 12C27.45 12 27 12.45 27 13C27 13.55 27.45 14 28 14Z" />
//       </svg>
//     ),
//     title: "Video-Based Interview Reviews",
//     paragraph:
//       "Submit a recorded interview to receive expert analysis on your communication style, tone, and presentation.",
//   },
//   {
//     id: 3,
//     icon: (
//       <svg width="40" height="41" viewBox="0 0 40 41" className="">
//         <path d="M20 2C10.06 2 2 10.06 2 20C2 29.94 10.06 38 20 38C29.94 38 38 29.94 38 20C38 10.06 29.94 2 20 2ZM20 34C12.28 34 6 27.72 6 20C6 12.28 12.28 6 20 6C27.72 6 34 12.28 34 20C34 27.72 27.72 34 20 34ZM20 10C15.58 10 12 13.58 12 18C12 22.42 15.58 26 20 26C24.42 26 28 22.42 28 18C28 13.58 24.42 10 20 10ZM20 22C17.79 22 16 20.21 16 18C16 15.79 17.79 14 20 14C22.21 14 24 15.79 24 18C24 20.21 22.21 22 20 22Z" />
//       </svg>
//     ),
//     title: "Psychometric Tests",
//     paragraph:
//       "Gain insights into your personality, cognitive abilities, and career suitability with our scientifically validated assessments.",
//   },
// ];
// export default featuresData;

import { type Feature } from "@/types";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="41" viewBox="0 0 40 41" className="fill-current">
        <defs>
          <linearGradient id="highlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="text-primary stop-color-current">
              <animate attributeName="stop-color" values="currentColor;#4F46E5;currentColor" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" className="text-secondary stop-color-current">
              <animate attributeName="stop-color" values="currentColor;#9333EA;currentColor" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <g className="hover:scale-105 transition-transform duration-300">
          {/* Interviewer */}
          <path d="M12 8a4 4 0 100-8 4 4 0 000 8zM12 10c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z" 
                className="animate-pulse" fill="url(#highlight)" />
          {/* Interviewee */}
          <path d="M28 8a4 4 0 100-8 4 4 0 000 8zM28 10c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z" 
                className="animate-pulse" fill="url(#highlight)" />
          {/* Dynamic speech bubbles */}
          <g className="origin-center">
            <path d="M11 24h8v6h-8l-4 4v-4H6v-6h5z" className="animate-bounce">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M29 28h-8v6h8l4 4v-4h1v-6h-5z" className="animate-bounce delay-1000">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
            </path>
          </g>
        </g>
      </svg>
    ),
    title: "Mock Interviews",
    paragraph: "1:1 sessions with experienced professionals to simulate real interview scenarios. Get feedback on responses, body language, and technical skills.",
  },
  {
    id: 2,
    icon: (
      <svg width="40" height="41" viewBox="0 0 40 41" className="fill-current">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g className="hover:scale-105 transition-transform duration-300">
          {/* Camera body with gradient */}
          <rect x="2" y="8" width="28" height="24" rx="3" className="fill-current">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
          </rect>
          {/* Lens */}
          <circle cx="16" cy="20" r="8" className="fill-current opacity-80" />
          <circle cx="16" cy="20" r="4" className="fill-current">
            <animate attributeName="r" values="3;4;3" dur="1s" repeatCount="indefinite" />
          </circle>
          {/* Record indicator */}
          <circle cx="26" cy="14" r="2" className="fill-red-500" filter="url(#glow)">
            <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
          </circle>
          {/* Video projection lines */}
          <path d="M30 12L38 8V32L30 28V12" className="fill-current opacity-80">
            <animate attributeName="d" 
                     values="M30 12L38 8V32L30 28V12;M30 11L38 7V33L30 29V11;M30 12L38 8V32L30 28V12" 
                     dur="2s" 
                     repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    ),
    title: "Video-Based Interview Reviews",
    paragraph: "Submit a recorded interview to receive expert analysis on your communication style, tone, and presentation.",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="41" viewBox="0 0 40 41" className="fill-current">
        <defs>
          <filter id="brainGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g className="hover:scale-105 transition-transform duration-300" filter="url(#brainGlow)">
          {/* Brain outline */}
          <path d="M20 2C10.06 2 2 10.06 2 20C2 29.94 10.06 38 20 38C29.94 38 38 29.94 38 20C38 10.06 29.94 2 20 2ZM20 34C12.28 34 6 27.72 6 20C6 12.28 12.28 6 20 6C27.72 6 34 12.28 34 20C34 27.72 27.72 34 20 34Z" 
                className="opacity-80">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </path>
          {/* Neural network nodes */}
          <g className="opacity-90">
            {/* Central node */}
            <circle cx="20" cy="20" r="4" className="fill-current">
              <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Surrounding nodes */}
            <circle cx="14" cy="14" r="2">
              <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="26" cy="14" r="2">
              <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" begin="1s" />
            </circle>
            <circle cx="14" cy="26" r="2">
              <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" begin="1.5s" />
            </circle>
            <circle cx="26" cy="26" r="2">
              <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" begin="0s" />
            </circle>
          </g>
          {/* Neural connections */}
          <g className="stroke-current" strokeWidth="1">
            <path d="M16 16L24 24" className="opacity-60">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" begin="0s" />
            </path>
            <path d="M24 16L16 24" className="opacity-60">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" begin="1s" />
            </path>
            <path d="M20 14L20 26" className="opacity-60">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" begin="1.5s" />
            </path>
            <path d="M14 20L26 20" className="opacity-60">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </path>
          </g>
        </g>
      </svg>
    ),
    title: "Psychometric Tests",
    paragraph: "Gain insights into your personality, cognitive abilities, and career suitability with our scientifically validated assessments.",
  },
];

export default featuresData;