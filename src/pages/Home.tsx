import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import { TextPressure } from '../components/TextPressure';

const Home: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-48"
    >
      {/* HERO SECTION */}
      <section className="min-h-[80vh] flex flex-col justify-center">
        <ScrollReveal direction="up" delay={0.2}>
          <h2 className="text-white/50 font-mono mb-4 text-xl tracking-widest uppercase">Hi, my name is</h2>
        </ScrollReveal>
        
        <TextPressure 
          text="Olivier Lafrance." 
          className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6" 
          delay={0.3} 
        />

        <ScrollReveal direction="up" delay={0.4}>
          <h3 className="text-3xl md:text-5xl font-bold text-white/50 mb-8 max-w-3xl">
            I build digital experiences.
          </h3>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.5}>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-12">
            I'm a full-stack developer obsessed with creating beautiful, smooth, and interactive websites. Let's make something that says "wow".
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.6}>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-accent text-accent font-bold hover:bg-accent hover:text-background transition-all duration-300 rounded-full group"
          >
            Get In Touch
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </section>

      {/* SKILLS SECTION */}
      <section>
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black">Skills & Expertise</h2>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Frontend', desc: 'React, Next.js, Tailwind CSS, Framer Motion, WebGL' },
            { title: 'Backend', desc: 'Node.js, Python, PostgreSQL, REST APIs' },
            { title: 'Design', desc: 'UI/UX Design, Figma, Prototyping, Wireframes' }
          ].map((skill, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.1}>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 transition-colors group h-full">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{skill.title}</h3>
                <p className="text-white/60 leading-relaxed">{skill.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black">Featured Projects</h2>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>
        </ScrollReveal>

        <div className="space-y-24">
          <ScrollReveal direction="left">
            <Link to={`/project/amployee`}>
              <div className="relative group rounded-3xl overflow-hidden aspect-video md:aspect-[21/9] bg-white/5 border border-white/10 cursor-none">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 z-10 transition-opacity group-hover:opacity-100" />
                
                {/* Use a blurred placeholder or background representing the app until an image is provided */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop')` }}
                />
                
                <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-accent font-mono mb-2 text-sm">2026</p>
                      <h3 className="text-3xl md:text-5xl font-bold mb-4 transition-transform origin-left group-hover:translate-x-2">AMployee</h3>
                      <p className="text-white/70 max-w-xl text-lg hidden md:block">Workforce, Simplified. A modern internal tool and employee management dashboard.</p>
                    </div>
                    <div className="w-16 h-16 flex-shrink-0 rounded-full bg-accent text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                      <ExternalLink />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;
