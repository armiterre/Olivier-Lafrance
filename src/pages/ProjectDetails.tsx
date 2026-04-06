import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

const ProjectDetails: React.FC = () => {
  const { id } = useParams();

  // Scroll to top when loading the details page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-accent transition-colors mb-12 font-mono text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <ScrollReveal direction="up">
        <div 
          className="relative aspect-[21/9] w-full bg-white/5 rounded-3xl mb-16 border border-white/10 flex items-center justify-center overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop')` }}
        >
           <div className="absolute inset-0 bg-background/50 top-0 left-0 w-full h-full" />
           <p className="font-mono text-white text-3xl font-bold relative z-10 tracking-widest uppercase">AMployee</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-black mb-8 capitalize">{id?.replace('-', ' ')}</h1>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <h3 className="text-3xl font-bold text-accent mb-6">Workforce, Simplified.</h3>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              AMployee is a robust, modern single-page application designed to fundamentally streamline workforce and employee management. By prioritizing a clean, minimalist UI, it turns data-heavy dashboards into an intuitive, accessible experience for administrators and employees alike.
            </p>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              My core objective with AMployee was to eliminate the friction typically found in legacy corporate portals. This involved engineering a unified design system, ensuring blazing-fast data fetching, and maintaining highly scalable architecture for future enterprise expansion.
            </p>

            <a 
              href="https://armiterre.github.io/AMployee/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-accent text-accent font-bold hover:bg-accent hover:text-background transition-all duration-300 rounded-full group mt-4 cursor-none"
            >
              View Live Project
            </a>
          </ScrollReveal>
        </div>

        <div>
          <ScrollReveal direction="up" delay={0.3}>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="font-bold text-xl mb-6 text-accent">Project Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-mono text-white/50">Year</p>
                  <p className="font-semibold">2026</p>
                </div>
                <div>
                  <p className="text-sm font-mono text-white/50">Role</p>
                  <p className="font-semibold">Full Stack Developer & Designer</p>
                </div>
                <div>
                  <p className="text-sm font-mono text-white/50">Tech Stack</p>
                  <p className="font-semibold">React, Vite, CSS</p>
                </div>
                <div>
                  <p className="text-sm font-mono text-white/50">Live URL</p>
                  <a href="https://armiterre.github.io/AMployee/" target="_blank" rel="noreferrer" className="font-semibold text-accent hover:underline">armiterre.github.io/AMployee</a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
