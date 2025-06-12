

// import { memo } from "react";
// import { type Program } from "@prisma/client";
// import { Button } from "@hidstech/common_components/components/ui/button.js";
// import { useRouter } from "next/navigation";

// type ProgramDetailsProps = {
//   program: Program | null; // Allow null for type safety
// };

// const ProgramDetails = memo(({ program }: ProgramDetailsProps) => {
//   if (!program) {
//     return (
//       <div className="container mx-auto py-12">
//         <p className="text-red-500">Program details are not available.</p>
//       </div>
//     );
//   }

//   const router = useRouter();

//   return (
//     <div className="container mx-auto py-12">
//       <h1 className="text-3xl font-bold">{program.name}</h1>
//       <Button
//         className="mt-8 bg-blue-600 text-white"
//         onClick={() => router.push(`/checkout?program=${program.id}`)} 
//       >
//         Buy Now
//       </Button>
//       <p className="mt-4">{program.description}</p>
//       <p className="mt-4 font-semibold">
//         Price: &#x20B9;{program.totalPrice}
//       </p>
//     </div>
//   );
// });

// export default ProgramDetails;



'use client';

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, BookOpen, Target } from 'lucide-react';
import { Program as PrismaProgram } from '@prisma/client';

interface ProgramDetailsProps {
  program: PrismaProgram;
}

export default function ProgramDetails({ program }: ProgramDetailsProps) {
  const tabs = [
    {
      value: "audience",
      label: "For Whom",
      icon: Users,
      content: "Designed for professionals seeking to enhance their video interviewing skills", 
    },
    {
      value: "overview",
      label: "Why Video Interview",
      icon: BookOpen,
      content: program.description 
    },
    {
      value: "duration",
      label: "How We Do It",
      icon: Clock,
      content: `This ${program.type} program includes interactive sessions and personalized feedback`, 
    },
    {
      value: "requirements",
      label: "Details On It",
      icon: Target,
      content: "Laptop with camera and stable internet connection required", 
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="overview" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-4 p-6 bg-card rounded-lg"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-lg leading-relaxed">{tab.content}</p>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}