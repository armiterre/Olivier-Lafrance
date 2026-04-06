import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({ text, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="mr-[0.25em] whitespace-nowrap overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1], // Crisp minimalist ease
                delay: delay + (wordIndex * 0.1) + (charIndex * 0.02)
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};
