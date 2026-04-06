import { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { IntroAnimation } from './components/IntroAnimation';
import { AnimatedBackground } from './components/AnimatedBackground';
import { BubbleMenu } from './components/BubbleMenu';
import { ScrollToTop } from './components/ScrollToTop';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ProjectDetails from './pages/ProjectDetails';

// Custom wrapper to enforce animation out then in perfectly with scroll reset
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      
      <AnimatePresence>
        {!introComplete && (
          <IntroAnimation onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      <AnimatedBackground />

      <motion.div 
        className="min-h-screen selection:bg-accent/30 selection:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <BubbleMenu />

        <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative z-10">
          <AnimatedRoutes />
        </main>
        
        <footer className="py-8 text-center text-white/30 font-mono text-sm border-t border-white/10 mt-24 relative z-10 w-full hover:text-accent transition-colors">
            <p>Designed & Built by Olivier Lafrance</p>
        </footer>
      </motion.div>
    </Router>
  );
}

export default App;
