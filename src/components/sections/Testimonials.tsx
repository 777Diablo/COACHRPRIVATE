


// "use client";

// import { motion } from "framer-motion";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import { Star, Quote } from "lucide-react";
// import Image from "next/image";

// interface Testimonial {
//   name: string;
//   role: string;
//   content: string;
//   rating: number;
//   image: string;
//   company: string;
// }

// const testimonials: Testimonial[] = [
//   {
//     name: "Sarah Johnson",
//     role: "Software Engineer",
//     company: "Google",
//     content: "CoachR helped me prepare for my dream job interview. The mock interviews were incredibly realistic and the feedback was invaluable.",
//     rating: 5,
//     image: "/images/testimonials/team.png"
//   },
//   {
//     name: "Michael Chen",
//     role: "Product Manager",
//     company: "Microsoft",
//     content: "The personalized coaching and detailed feedback helped me understand my strengths and areas for improvement. Highly recommended!",
//     rating: 3,
//     image: "/images/testimonials/team.png"
//   },
//   {
//     name: "Emily Rodriguez",
//     role: "Marketing Director",
//     company: "Adobe",
//     content: "The psychometric tests provided great insights into my personality and helped me present myself better during interviews.",
//     rating: 5,
//     image: "/images/testimonials/team.png"
//   },
//   {
//     name: "David Kim",
//     role: "Data Scientist",
//     company: "Amazon",
//     content: "Outstanding platform! The video interview reviews helped me refine my communication skills significantly.",
//     rating: 2,
//     image: "/images/testimonials/team.png"
//   }
// ];

// const TestimonialsDemo = () => {
//   const renderStars = (rating: number) => {
//     return Array.from({ length: rating }, (_, index) => (
//       <motion.div
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: index * 0.1 }}
//         key={index}
//       >
//         <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
//       </motion.div>
//     ));
//   };

//   return (
//     <section id="testimonials" className="py-24 ">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-16 text-center"
//         >
//           <motion.span
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
//           >
//             Testimonials
//           </motion.span>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-4xl font-bold text-transparent lg:text-5xl"
//           >
//             What Our Users Say
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="mx-auto max-w-2xl text-lg text-muted-foreground"
//           >
//             Success stories from professionals who transformed their interview
//             performance with CoachR
//           </motion.p>
//         </motion.div>

//         <Carousel
//           opts={{
//             align: "start",
//             loop: true,
//           }}
//           className="mx-auto w-full max-w-6xl"
//         >
//           <CarouselContent>
//             {testimonials.map((testimonial, index) => (
//               <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//                 <motion.div
//                   className="p-2"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Card className="group relative overflow-hidden">
//                     <CardContent className="p-6">
//                       <Quote className="absolute right-4 top-4 h-12 w-12 opacity-5 transition-opacity duration-300 group-hover:opacity-10" />
//                       <div className="mb-6 flex items-center space-x-4">
//                         <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/20">
//                           <Image
//                             src={testimonial.image}
//                             alt={testimonial.name}
//                             fill
//                             className="object-cover transition-transform duration-300 group-hover:scale-110"
//                           />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-primary">
//                             {testimonial.name}
//                           </h4>
//                           <p className="text-sm text-muted-foreground">
//                             {testimonial.role}
//                           </p>
//                           <p className="text-xs font-medium text-primary/60">
//                             {testimonial.company}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="mb-4 flex space-x-1 text-yellow">
//                         {renderStars(testimonial.rating)}
//                       </div>
//                       <p className="mb-4 text-muted-foreground">
//                         {testimonial.content}
//                       </p>
//                       <motion.div
//                         className="h-1 w-0 bg-gradient-to-r from-primary/40 to-primary group-hover:w-full"
//                         transition={{ duration: 0.3 }}
//                       />
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious className="border-primary/20 bg-white/80 hover:bg-white/90 dark:bg-white/10" />
//           <CarouselNext className="border-primary/20 bg-white/80 hover:bg-white/90 dark:bg-white/10" />
//         </Carousel>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsDemo;