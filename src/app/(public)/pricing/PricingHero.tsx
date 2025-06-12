'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function PricingHero() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background min-h-[70vh]">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto "
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mb-6 inline-flex flex-col items-center space-y-4"
          >
            <div className="p-3 bg-primary/10 rounded-full">
              <Sparkles className="h-8 w-8 text-primary " />
            </div>

            
            <span className="inline-block animate__animated animate__fadeInDown">
              <span className="bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium px-4 py-2 rounded-full">
                Transform Your Journey with CoachR
              </span>
            </span>
            
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60  bg-clip-text dark:text-gray-100">
            {/* Choose the Perfect Coaching Plan */}
            Choose Your Perfect <span className="text-primary">Coaching Program</span>
          </h1>
          
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock your potential with our comprehensive interview preparation plans. 
            Find the perfect package that fits your career goals.
          </p>
          

          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {['30-Day Money Back Guarantee', 'No Credit Card Required', 'Cancel Anytime'].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}