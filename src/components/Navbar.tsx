import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Home as HomeIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true); // Hidden at the very top for minimalism

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hide navbar if we are at the top (y < 50), show it if scrolled down
    if (latest < 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      initial="hidden"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference bg-background/50 backdrop-blur-md"
    >
      <Link to="/">
        <div className="text-xl font-black tracking-tighter hover:text-white/70 transition-colors">
          OL.
        </div>
      </Link>
      <div className="flex gap-6">
        <Link to="/" className="text-sm font-semibold uppercase tracking-widest hover:text-white/70 transition-colors flex items-center gap-2">
          <HomeIcon size={16} /> Home
        </Link>
        <Link to="/contact" className="text-sm font-semibold uppercase tracking-widest hover:text-white/70 transition-colors flex items-center gap-2">
          <Mail size={16} /> Contact
        </Link>
      </div>
    </motion.nav>
  );
};
