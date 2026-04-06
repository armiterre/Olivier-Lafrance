import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TextPressureProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextPressure: React.FC<TextPressureProps> = ({ text, className = "", delay = 0 }) => {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleMouseLeave = () => {
      mouseX.set(Infinity);
      mouseY.set(Infinity);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div className={`flex flex-wrap ${className}`}>
      {text.split('').map((char, index) => (
        <InteractiveChar 
          key={index} 
          char={char} 
          index={index}
          delay={delay}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </div>
  );
};

const InteractiveChar = ({ char, index, delay, mouseX, mouseY }: any) => {
  const ref = useRef<HTMLSpanElement>(null);

  // We need to calculate distance dynamically in a render loop without triggering React renders.
  // Framer motion allows chaining useTransform mathematically, or using a custom hook with requestAnimationFrame,
  // but to do it cleanly across x and y we can use an 'on-change' listener inside a useMotionValue, 
  // or use `useTransform` with a multi-value approach, but `useTransform` on multiple values takes an array in newer framer-motion:
  const weightVal = useMotionValue(200);
  const springWeight = useSpring(weightVal, { stiffness: 300, damping: 20 });

  useEffect(() => {
    let animationFrameId: number;
    let isActive = true;

    const updateWeight = () => {
      if (!isActive) return;
      if (!ref.current) {
        animationFrameId = requestAnimationFrame(updateWeight);
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const mx = mouseX.get();
      const my = mouseY.get();

      if (mx === Infinity) {
        weightVal.set(200);
      } else {
        const dx = mx - charCenterX;
        const dy = my - charCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 300;
        if (dist < maxDist) {
          const strength = 1 - (dist / maxDist);
          const w = 200 + (700 * Math.pow(strength, 1.5));
          weightVal.set(w);
        } else {
          weightVal.set(200);
        }
      }

      animationFrameId = requestAnimationFrame(updateWeight);
    };

    updateWeight();

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, weightVal]);

  return (
    <motion.span
      ref={ref}
      className="inline-block transition-transform duration-150 ease-out"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + index * 0.03 }}
      style={{ fontWeight: springWeight }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};
