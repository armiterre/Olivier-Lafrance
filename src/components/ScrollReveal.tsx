import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className, 
  delay = 0,
  direction = 'up',
  once = false // Triggers every time per request
}) => {
  const directions = {
    up: { y: 60, opacity: 0 },
    down: { y: -60, opacity: 0 },
    left: { x: 60, opacity: 0 },
    right: { x: -60, opacity: 0 }
  };

  return (
    <motion.div
      className={cn("w-full", className)}
      initial={directions[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-10%" }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // Very crisp snappy curve like ddaniel
        delay
      }}
    >
      {children}
    </motion.div>
  );
};
