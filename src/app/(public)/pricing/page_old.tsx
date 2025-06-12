"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Sparkles, Shield, Zap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Define types
type Currency = "INR" | "USD";
type Mode = "online" | "in-person";

interface Service {
  id: string;
  name: string;
  icon: any;
  description: string;
  mode: Mode;
  features: string[];
  standardPrice: {
    INR: number;
    USD: number;
  };
  premiumPrice: {
    INR: number;
    USD: number;
  };
  popular?: boolean;
  color: string;
  hover: string;
}

const services: Service[] = [
  {
    id: "personal",
    name: "Mock Interview with Feedback & Coaching",
    icon: Zap,
    description: "Perfect for individuals starting their interview preparation",
    mode: "online",
    standardPrice: {
      INR: 10000,
      USD: 160,
    },
    premiumPrice: {
      INR: 18500,
      USD: 255,
    },
    features: [
      "1 Mock Interview Session",
      "Detailed Feedback Report",
      "Basic Interview Tips",
      "Question Bank Access",
      "Performance Analytics",
    ],
    color: "from-blue-500/10 to-cyan-500/10",
    hover: "hover:border-blue-500/50",
  },
  {
    id: "premium",
    name: "Mock Interview with Feedback, Psychometric Assessment & Coaching",
    icon: Sparkles,
    description: "Comprehensive preparation for serious candidates",
    mode: "online",
    standardPrice: {
      INR: 15000,
      USD: 230,
    },
    premiumPrice: {
      INR: 22500,
      USD: 320,
    },
    features: [
      "2 Mock Interview Sessions",
      "Psychometric Assessment",
      "Priority Support",
      "Interview Strategy Session",
      "Resume Review",
      "1-on-1 Coaching Session",
      "Industry-specific Preparation",
    ],
    popular: true,
    color: "from-violet-500/10 to-purple-500/10",
    hover: "hover:border-violet-500/50",
  },
  {
    id: "business",
    name: "In-Person Interview Preparation",
    icon: Users,
    description: "Face-to-face coaching for maximum impact",
    mode: "in-person",
    standardPrice: {
      INR: 25000,
      USD: 350,
    },
    premiumPrice: {
      INR: 35000,
      USD: 480,
    },
    features: [
      "3 In-Person Sessions",
      "Body Language Analysis",
      "Dedicated Coach",
      "Advanced Interview Tools",
      "Custom Learning Path",
      "Video Recording & Analysis",
      "Post-Session Support",
      "Interview Wardrobe Consultation",
    ],
    color: "from-orange-500/10 to-amber-500/10",
    hover: "hover:border-orange-500/50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const [mode, setMode] = useState<Mode>("online");
  const [currency, setCurrency] = useState<Currency>("INR");

  const filteredServices = services.filter((service) => service.mode === mode);

  const formatPrice = (price: number): string => {
    return currency === "INR"
      ? `₹${price.toLocaleString("en-IN")}`
      : `$${price.toLocaleString("en-US")}`;
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="container relative mx-auto px-4"
        >
          <div className="mx-auto max-w-3xl text-center">
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
            >
              Choose Your Path to Interview Success
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 text-xl text-muted-foreground"
            >
              Services by HR Experts and Certified Coaches
            </motion.p>
            
            {/* Mode and Currency Toggles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 flex flex-col items-center justify-center gap-8 sm:flex-row"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Online</span>
                <Switch
                  checked={mode === "in-person"}
                  onCheckedChange={(checked) =>
                    setMode(checked ? "in-person" : "online")
                  }
                />
                <span className="text-sm font-medium">In-person</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">₹ (INR)</span>
                <Switch
                  checked={currency === "USD"}
                  onCheckedChange={(checked) =>
                    setCurrency(checked ? "USD" : "INR")
                  }
                />
                <span className="text-sm font-medium">$ (USD)</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Plans */}
      
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredServices.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="relative"
                  >
                    <Card
                      className={`relative flex h-full flex-col overflow-hidden p-8 transition-all duration-300 ${
                        service.popular
                          ? "border-primary shadow-2xl"
                          : `border-border/50 ${service.hover}`
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-30`}
                      />
                      {service.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <motion.span
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-lg"
                          >
                            <Star className="h-4 w-4" fill="currentColor" />
                            Most Popular
                          </motion.span>
                        </div>
                      )}
                      <div className="relative">
                        <div className="mb-6 flex items-center justify-between">
                          <div
                            className={`rounded-2xl p-3 ${
                              service.popular
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="text-right">
                            <div className="mb-1 text-sm text-muted-foreground">
                              Starting from
                            </div>
                            <div className="text-3xl font-bold">
                              {formatPrice(service.standardPrice[currency])}
                            </div>
                          </div>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                          {service.name}
                        </h3>
                        <p className="mb-6 text-muted-foreground">
                          {service.description}
                        </p>
                        <ul className="mb-8 flex-grow space-y-4">
                          {service.features.map((feature) => (
                            <motion.li
                              key={feature}
                              whileHover={{ x: 2 }}
                              className="flex items-center gap-3 text-sm"
                            >
                              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                        <div className="space-y-4">
                          <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20">
                            Standard Plan -{" "}
                            {formatPrice(service.standardPrice[currency])}
                          </Button>
                          <Button
                            className={`w-full ${
                              service.popular
                                ? "bg-primary hover:bg-primary/90"
                                : "bg-primary/10 text-primary hover:bg-primary/20"
                            }`}
                          >
                            Premium Plan -{" "}
                            {formatPrice(service.premiumPrice[currency])}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold">
              Everything you need to succeed
            </h2>
            <p className="text-muted-foreground">
              All plans include these essential features to help you excel in
              your interviews
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Secure Platform",
                description:
                  "Enterprise-grade security to protect your data and privacy",
              },
              {
                icon: Zap,
                title: "Real-time Feedback",
                description:
                  "Get instant insights on your interview performance",
              },
              {
                icon: Users,
                title: "Expert Support",
                description:
                  "Access to our team of career coaches and industry experts",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full p-6 transition-shadow hover:shadow-lg">
                  <feature.icon className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="mb-12 text-center text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What is included in the Premium Plan?",
                  a: "The Premium Plan includes unlimited mock interviews, personalized feedback from experts, priority support, and exclusive access to psychometric tests designed to enhance your interview performance.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Yes, you can cancel your subscription at any time. There are no long-term commitments, and you won't be charged for the next billing cycle after cancellation.",
                },
                {
                  q: "How does the 7-day free trial work?",
                  a: "Start with any plan and explore all features for 7 days without any charge. If you're not satisfied, cancel before the trial ends, and you won't be billed.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 transition-shadow hover:shadow-md">
                    <h3 className="mb-2 text-lg font-semibold">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container relative mx-auto px-4 text-center text-primary-foreground"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Join thousands of successful professionals who transformed their
            careers with CoachR.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              size="lg"
              className="min-w-[200px] shadow-xl"
            >
              Get Started Now
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
