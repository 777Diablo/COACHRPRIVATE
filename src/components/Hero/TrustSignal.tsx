'use client';

import { motion } from 'framer-motion';
import { Star, Users } from 'lucide-react';

export default function TrustSignals() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-6"
    >
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <span className="text-muted-foreground">
          Trusted by <span className="font-semibold text-foreground">500+</span> professionals
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-primary" />
        <span className="text-muted-foreground">
          Rated <span className="font-semibold text-foreground">4.8/5</span> by our users
        </span>
      </div>
    </motion.div>
  );
}