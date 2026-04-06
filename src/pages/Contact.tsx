import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Check } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

const Contact: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-full flex flex-col items-center justify-center max-w-4xl mx-auto -mt-32"
    >
      <ScrollReveal direction="up">
        <h1 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter text-center">
          Let's <span className="text-white/50">Talk.</span>
        </h1>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2} className="w-full">
        <p className="text-xl text-white/70 mb-16 leading-relaxed text-center max-w-2xl mx-auto">
          Currently available for freelance work. Reach out directly.
        </p>
      </ScrollReveal>

      <div className="flex flex-col md:flex-row gap-8 w-full justify-center max-w-2xl mx-auto">
        <ScrollReveal direction="left" delay={0.3} className="flex-1">
          <button 
            onClick={(e) => handleCopy(e, 'olivierlafrance10@gmail.com')}
            className="relative flex items-center justify-between w-full p-8 rounded-xl bg-white/5 border border-white/10 hover:border-white/50 transition-all group overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <Mail size={24} className="text-white/50 group-hover:text-white transition-colors flex-shrink-0" />
              <div className="text-left overflow-hidden">
                <p className="text-sm font-mono text-white/50">Email</p>
                <p className="font-bold text-sm md:text-base truncate">olivierlafrance10@gmail.com</p>
              </div>
            </div>
            
            <AnimatePresence>
              {copiedText === 'olivierlafrance10@gmail.com' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-0 bg-white text-black flex items-center justify-center font-bold tracking-widest uppercase text-sm gap-2"
                >
                  <Check size={18} /> Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.4} className="flex-1">
          <button 
            onClick={(e) => handleCopy(e, '5147172589')}
            className="relative flex items-center justify-between w-full p-8 rounded-xl bg-white/5 border border-white/10 hover:border-white/50 transition-all group overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <Phone size={24} className="text-white/50 group-hover:text-white transition-colors flex-shrink-0" />
              <div className="text-left overflow-hidden">
                <p className="text-sm font-mono text-white/50">Phone</p>
                <p className="font-bold text-sm md:text-base truncate">(514) 717-2589</p>
              </div>
            </div>

            <AnimatePresence>
              {copiedText === '5147172589' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-0 bg-white text-black flex items-center justify-center font-bold tracking-widest uppercase text-sm gap-2"
                >
                  <Check size={18} /> Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </ScrollReveal>
      </div>

    </motion.div>
  );
};

export default Contact;
