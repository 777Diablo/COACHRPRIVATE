// "use client";

// import { useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, CheckCircle, AlertTriangle, MapPin, Clock, ChevronUp } from "lucide-react";
// import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import { Program, getIconComponent } from "@/app/(public)/program/[slug]/types";

// const ProgramFeatures = ({ program }: { program: Program }) => {
//   const router = useRouter();

//   const [selectedMode, setSelectedMode] = useState<"online" | "inPerson">(
//     program.programType === "in-person-only" ? "inPerson" : "online"
//   );

//   const isModeAvailable = useMemo(
//     () =>
//       ({
//         "online-only": selectedMode === "online",
//         "in-person-only": selectedMode === "inPerson",
//         hybrid: true,
//       })[program.programType] ?? false,
//     [selectedMode, program.programType]
//   );

//   const modeError = useMemo(() => {
//     if (isModeAvailable) return null;
//     return (
//       {
//         "online-only":
//           selectedMode === "inPerson" ? "This program is online only" : null,
//         "in-person-only":
//           selectedMode === "online" ? "This program is in-person only" : null,
//         hybrid: null,
//       }[program.programType] ?? null
//     );
//   }, [isModeAvailable, selectedMode, program.programType]);

//   const currentMode = program.modes[selectedMode];

//   const programDetails = useMemo(
//     () => [
//       ...program.programDetails.commonDetails,
//       ...program.programDetails.premiumDetails,
//     ],
//     [program.programDetails]
//   );

//   const Feature = ({ detail, index }: { detail: any; index: number }) => {
//     const Icon = detail.icon ? getIconComponent(detail.icon) : null;
//     return (
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay: index * 0.1 }}
//         className="feature-item"
//         tabIndex={0}
//         role="article"
//         aria-label={`Feature: ${detail.title}`}
//       >
//         <div className="flex items-start space-x-4 rounded-lg p-4 transition-colors hover:bg-secondary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
//           {Icon && (
//             <div
//               className={`rounded-lg p-2 ${detail.premium ? "bg-yellow-500/10" : "bg-primary/10"}`}
//             >
//               <Icon
//                 className={`h-6 w-6 ${detail.premium ? "text-yellow-500" : "text-primary"}`}
//               />
//             </div>
//           )}
//           <div>
//             <div className="flex items-center gap-2">
//               <h4 className="text-lg font-semibold">{detail.title}</h4>
//               {detail.premium && (
//                 <span className="bg-yellow-500 rounded-full px-2 py-0.5 text-xs text-white">
//                   Premium
//                 </span>
//               )}
//             </div>
//             <p className="text-sm text-muted-foreground">
//               {detail.description}
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   const PricingCard = ({ type, pricing }: { type: string; pricing: any }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       className="flex h-full flex-col"
//     >
//       <Card
//         className={`flex-1 transition-all duration-300 hover:shadow-xl ${
//           type === "premium" ? "relative overflow-hidden border-primary shadow-lg" : ""
//         }`}
//       >
//         {type === "premium" && (
//           <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-primary-foreground">
//             Popular
//           </div>
//         )}
//         <CardHeader>
//           <h3 className="text-xl font-bold capitalize">{type}</h3>
//           <div className="space-y-1">
//             <div className="text-3xl font-bold text-primary">{pricing.inr}</div>
//             <div className="text-sm text-muted-foreground">
//               USD {pricing.usd}
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {type === "premium" && (
//             <>
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="flex items-center gap-3"
//               >
//                 <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary" />
//                 <span className="text-sm">
//                   Get Coached by Senior HR Experts
//                 </span>
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="flex items-center gap-3"
//               >
//                 <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary" />
//                 <span className="text-sm">
//                   Get Extended support from your Coach
//                 </span>
//               </motion.div>
//             </>
//           )}
//         </CardContent>
//         <CardFooter>
//           <Button
//             className={`group w-full ${
//               type === "premium"
//                 ? "bg-primary text-primary-foreground hover:bg-primary/90"
//                 : "border-2 hover:bg-primary/5"
//             }`}
//             onClick={() => router.push("/checkout")}
//           >
//             Select {type}
//             <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//           </Button>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   );

//   return (
//     <section className="bg-background py-24">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-12 text-center"
//         >
//           <div className="mb-8 flex justify-center gap-4">
//             {["online", "inPerson"].map((mode) => (
//               <Button
//                 key={mode}
//                 variant={selectedMode === mode ? "default" : "outline"}
//                 onClick={() => setSelectedMode(mode as "online" | "inPerson")}
//                 className="group min-w-[120px]"
//               >
//                 {mode === "online" ? "Online" : "In-Person"}
//               </Button>
//             ))}
//           </div>
//         </motion.div>

//         {modeError ? (
//           <div className="bg-yellow-50 border-yellow-200 flex items-center justify-center rounded-lg border p-8 text-center">
//             <div className="flex flex-col items-center space-y-4">
//               <AlertTriangle className="text-yellow-600 h-12 w-12" />
//               <h3 className="text-yellow-800 text-xl font-semibold">
//                 Program Unavailable
//               </h3>
//               <p className="text-yellow-700">{modeError}</p>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
//             {/* Left side - Features section */}
//             <div className="relative lg:col-span-1">
//               <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
//                 <CheckCircle className="h-6 w-6 text-primary" />
//                 What You Get
//               </h3>
//               {programDetails.map((detail, index) => (
//                 <Feature key={index} detail={detail} index={index} />
//               ))}
//             </div>

//             {/* Right side - Pricing section */}
//             <div className="lg:col-span-2">
//               <div className="h-full">
//                 <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
//                   {selectedMode === "online" ? "Online" : "In Person"} Program
//                 </h3>

//                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//                   {currentMode?.pricing &&
//                     Object.entries(currentMode.pricing).map(
//                       ([type, pricing]) => (
//                         <PricingCard key={type} type={type} pricing={pricing} />
//                       )
//                     )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {program.programType === "in-person-only" &&
//           selectedMode === "inPerson" && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-8 rounded-lg border border-primary/10 bg-primary/5 p-6"
//             >
//               <div className="flex items-center justify-center gap-3 text-muted-foreground">
//                 <MapPin className="h-5 w-5 text-primary" />
//                 <p className="font-medium">
//                   Available in Delhi, Mumbai, Bhubaneswar
//                   <span className="mx-2">•</span>
//                   <Clock className="mx-1 inline-block h-4 w-4" />
//                   Monday to Friday, 10 AM - 6 PM
//                 </p>
//               </div>
//             </motion.div>
//           )}
//       </div>
//     </section>
//   );
// };

// export default ProgramFeatures;
