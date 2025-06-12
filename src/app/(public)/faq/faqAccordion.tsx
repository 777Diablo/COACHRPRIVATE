'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqAccordionProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

export default function FaqAccordion({ questions }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue="0" className="w-full">
      {questions.map((faq, index) => (
        <AccordionItem 
          key={index} 
          value={index.toString()} 
          className="dark:border-slate-700"
        >
          <AccordionTrigger className="text-left py-5 px-2 dark:text-slate-200 dark:hover:text-slate-100">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="py-4 px-2">
            <p className="text-muted-foreground dark:text-slate-400">
              {faq.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}