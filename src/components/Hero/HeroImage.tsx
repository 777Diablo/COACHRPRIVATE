"use client";

import { motion } from "framer-motion";
// import Image from 'next/image';
import FloatingFeatures from "./Floatingfeatures";
import Image from "next/image";
// import FloatingFeatures from './FloatingFeatures';

export default function HeroImage() {
  return (
    <div className="relative mt-8 min-h-[400px] flex-1 lg:mt-0">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* <Image
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
          alt="Professional Interview"
          className="rounded-lg shadow-2xl"
          fill
          style={{ objectFit: 'cover' }}
          priority
       
        /> */}
        {/* <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
          alt="Professional Interview"
          className="mx-auto h-[400px] w-full max-w-[600px] rounded-lg object-cover shadow-2xl"
        /> */}
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
          alt="Professional Interview"
          className="rounded-lg shadow-2xl"
          style={{
            width: "100%", 
            maxWidth: "600px", 
            height: "400px", 
            objectFit: "cover", 
            margin: "0 auto", 
            display: "block", 
          }}
        />

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10" />
      </motion.div>

      <FloatingFeatures />
    </div>
  );
}
