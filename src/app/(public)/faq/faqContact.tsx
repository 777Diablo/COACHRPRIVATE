"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FaqContact() {
  const router = useRouter();
  return (
    <section className="bg-accent/5 py-16 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold dark:text-slate-200">
            Still Have Questions?
          </h2>
          <p className="mb-8 text-muted-foreground dark:text-slate-400">
            Can&apose;t find the answer you&apos;re looking for? Our team is here to help!
          </p>
          <Button
            size="lg"
            className="dark:bg-primary/90 dark:hover:bg-primary/80"
            onClick={() => router.push('/contact')}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
