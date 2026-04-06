import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronsRight } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      800,  // Wait before first command
      400,  // Show pwd
      1000, // Show pwd result
      400,  // Show cd portfolio
      800,  // Show ls
      1200, // Show ls result
      400,  // Show npm run dev
      1500, // Show server starting
      1500  // End
    ];
    
    let timer: ReturnType<typeof setTimeout>;
    let accumulatedTime = 0;
    
    sequence.forEach((delay, index) => {
      accumulatedTime += delay;
      timer = setTimeout(() => {
        setStep(index + 1);
        if (index === sequence.length - 1) {
          onComplete();
        }
      }, accumulatedTime);
    });

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.section
      className="fixed inset-0 z-[9990] bg-background text-textPrimary p-4 md:p-12 font-mono text-sm md:text-base flex flex-col justify-between"
      exit={{ y: "-100vh", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex flex-col gap-2 relative">
        <button 
          onClick={onComplete}
          className="absolute top-0 right-0 flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
        >
          <span>Skip Animation</span>
          <ChevronsRight size={16} />
        </button>

        {step >= 1 && (
          <div className="flex gap-4">
            <div className="font-bold text-accent">olivier@archlinux:~$</div>
            <motion.div initial={{ width: 0 }} animate={{ width: "auto" }} transition={{ duration: 0.3 }} className="overflow-hidden whitespace-nowrap">
              pwd
            </motion.div>
          </div>
        )}
        
        {step >= 2 && <div>/home/olivier</div>}

        {step >= 3 && (
          <div className="flex gap-4">
            <div className="font-bold text-accent">olivier@archlinux:~$</div>
            <motion.div initial={{ width: 0 }} animate={{ width: "auto" }} transition={{ duration: 0.3 }} className="overflow-hidden whitespace-nowrap">
              cd portfolio
            </motion.div>
          </div>
        )}

        {step >= 4 && (
          <div className="flex gap-4">
            <div className="font-bold text-accent">olivier@archlinux:~/portfolio$</div>
            <motion.div initial={{ width: 0 }} animate={{ width: "auto" }} transition={{ duration: 0.3 }} className="overflow-hidden whitespace-nowrap">
              ls
            </motion.div>
          </div>
        )}

        {step >= 5 && (
          <div className="text-white/70 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 mb-2">
            <div>node_modules/</div>
            <div>public/</div>
            <div>src/</div>
            <div>index.html</div>
            <div>package.json</div>
            <div>README.md</div>
            <div>tailwind.config.css</div>
            <div>vite.config.ts</div>
          </div>
        )}

        {step >= 6 && (
          <div className="flex gap-4">
            <div className="font-bold text-accent">olivier@archlinux:~/portfolio$</div>
            <motion.div initial={{ width: 0 }} animate={{ width: "auto" }} transition={{ duration: 0.5 }} className="overflow-hidden whitespace-nowrap">
              npm run dev
            </motion.div>
          </div>
        )}

        {step >= 7 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-green-400">
            &gt; portfolio@1.0.0 dev <br/>
            &gt; vite <br/><br/>
            VITE v8.0.5  ready in 119 ms <br/><br/>
            ➜  Local:   http://localhost:5173/ <br/>
            ➜  Network: use --host to expose
          </motion.div>
        )}
        
        {step >= 8 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 animate-pulse">
            Loading interface...
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
