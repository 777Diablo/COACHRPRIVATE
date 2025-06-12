'use client';

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

export default function CheckoutHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
      >
        <ShoppingCart className="h-8 w-8 text-primary" />
      </motion.div>

      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="text-muted-foreground max-w-md mx-auto">
        Complete your purchase and start your interview preparation journey
      </p>
    </motion.div>
  );
}