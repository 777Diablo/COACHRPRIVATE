'use client';

import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, BarChart } from 'lucide-react';

const features = [
  { 
    icon: CheckCircle,
    label: 'Expert Review',
    position: { top: '10%', left: '-5%' }
  },
  { 
    icon: MessageCircle,
    label: 'Live Feedback',
    position: { top: '40%', right: '-5%' }
  },
  { 
    icon: BarChart,
    label: 'Performance Analytics',
    position: { bottom: '10%', left: '10%' }
  }
];

export default function FloatingFeatures() {
  return (
    <>
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={index}
            className="absolute z-20 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-lg flex items-center gap-2"
            style={feature.position}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.2 }}
          >
            <Icon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{feature.label}</span>
          </motion.div>
        );
      })}
    </>
  );
}