import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Mail, Code } from 'lucide-react';

const BubbleMenuItem = ({ item, mouseX }: { item: any; mouseX: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-full bg-white/10 border border-white/20 flex flex-col items-center justify-center text-white hover:bg-accent/20 hover:text-accent hover:border-accent shadow-lg transition-colors cursor-none relative group"
    >
      <div className="absolute inset-0 flex items-center justify-center scale-50 group-hover:scale-[0.55] transition-transform">
        {item.icon}
      </div>
      {/* Tooltip */}
      <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 bg-background/90 text-white text-xs font-mono px-3 py-1 rounded-full border border-white/10 pointer-events-none transition-opacity whitespace-nowrap">
        {item.name}
      </div>
    </motion.div>
  );
};

export const BubbleMenu: React.FC = () => {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const handleScroll = (latest: number) => {
      if (location.pathname === '/' && latest < 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    
    // Initial check
    handleScroll(scrollY.get());

    return scrollY.on('change', handleScroll);
  }, [scrollY, location.pathname]);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (path.startsWith('/#')) {
      const id = path.split('#')[1];
      if (location.pathname === '/') {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path === '/' && location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const items = [
    { name: 'Home', path: '/', icon: <Home size={32} /> },
    { name: 'Projects', path: '/#projects', icon: <Code size={32} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={32} /> },
  ];

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-center gap-4 px-4 py-3 rounded-full bg-background/70 backdrop-blur-xl border border-white/10 shadow-2xl h-[70px]"
      >
        {items.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            onClick={(e) => handleNavClick(e, item.path)}
          >
            <BubbleMenuItem item={item} mouseX={mouseX} />
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
