// 'use client';

// import { motion } from 'framer-motion';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Clock, Users, BookOpen, Target } from 'lucide-react';

// import { Program } from '@/app/(public)/program/[slug]/types';


// interface ProgramDetailsProps {
//   program: Program;
// }


//   export default function ProgramDetails({ program }:ProgramDetailsProps) {
//   const tabs = [
//     {
//       value: "audience",
//       label: " For Whom",
//       icon: Users,
//       content: `This program is designed for ${program.targetAudience}.`
//     },
//     {
//       value: "overview",
//       label: "Why Video interview",
//       icon: BookOpen,
//       content: program.description
//     },
//     {
//       value: "duration",
//       label: "How We Do It",
//       icon: Clock,
//       // content: `This program runs for ${program.duration} with flexible scheduling options.`
//     },
//     {
//       value: "requirements",
//       label: "Details On It",
//       icon: Target,
//       content: program.requirements
//     },
  
//   ];

//   return (
//     <section className="py-24 bg-background">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//         >
//           <Tabs defaultValue="overview" className="max-w-4xl mx-auto">
//             <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
//               {tabs.map((tab) => (
//                 <TabsTrigger
//                   key={tab.value}
//                   value={tab.value}
//                   className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
//                 >
//                   <tab.icon className="h-4 w-4" />
//                   {tab.label}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//             {tabs.map((tab) => (
//               <TabsContent
//                 key={tab.value}
//                 value={tab.value}
//                 className="mt-4 p-6 bg-card rounded-lg"
//               >
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <p className="text-lg leading-relaxed">{tab.content}</p>
//                 </motion.div>
//               </TabsContent>
//             ))}
//           </Tabs>
//         </motion.div>
//       </div>
//     </section>
//   );
// }