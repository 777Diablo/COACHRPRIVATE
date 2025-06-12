'use client';

import { HelpCircle } from 'lucide-react';

export default function FaqHero() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background dark:from-primary/10 dark:via-slate-900 dark:to-slate-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.02]" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 inline-block">
            <div className="p-3 bg-primary/10 rounded-full dark:bg-primary/20">
              <HelpCircle className="h-8 w-8 text-primary dark:text-primary/90" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent dark:from-primary/90 dark:to-primary/50">
            Frequently Asked Questions
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto dark:text-slate-400">
            Find answers to common questions about our services and how we can help you succeed in your career journey.
          </p>
        </div>
      </div>
    </section>
  );
}