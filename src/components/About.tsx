import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import DarkVeil from './DarkVeil';

interface AnimatedNumberProps {
  value: string;
  delay: number;
}

const AnimatedNumber = ({ value, delay }: AnimatedNumberProps) => {
  const [displayed, setDisplayed] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  
  useEffect(() => {
    if (isInView) {
      // Reset to 0 first, then animate
      setDisplayed('0');
      
      const timeout = setTimeout(() => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          const start = 0;
          const end = numericValue;
          const duration = 1000;
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;
            
            if (value.includes('.')) {
              setDisplayed(current.toFixed(3));
            } else {
              setDisplayed(Math.floor(current).toString());
            }
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayed(value);
            }
          };
          
          requestAnimationFrame(animate);
        } else {
          setDisplayed(value);
        }
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay]);
  
  return <span ref={ref}>{displayed}</span>;
};

const stats = [
  { label: 'Hackathons Participated', value: 'Multiple', subtext: 'National & College' },
  { label: 'Core Domains', value: '3+', subtext: 'Backend, AI, Full-Stack' },
  { label: 'Research Work', value: '1', subtext: 'Under IEEE Review' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  
  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Dark Veil WebGL Background */}
      <div className="absolute inset-0 opacity-30">
        <DarkVeil speed={0.3} hueShift={180} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl font-semibold mb-16"
        >
          About
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Education */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="space-y-8"
          >
            {/* College */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm font-mono uppercase tracking-wider">
                Education
              </p>
              <h3 className="text-xl font-medium">
                Sri Venkateswara College of Engineering
              </h3>
              <p className="text-foreground/90">
                BE Computer Science and Engineering
              </p>
              <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm pt-2">
                <div>
                  <span className="text-muted-foreground">CGPA</span>
                <p className="text-2xl font-semibold text-primary mt-1">
                    <AnimatedNumber value="8.430" delay={200} />
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Graduation</span>
                  <p className="text-2xl font-semibold mt-1">
                    <AnimatedNumber value="2027" delay={300} />
                  </p>
                </div>
              </div>
            </div>
            
            {/* 12th */}
            <div className="space-y-2 pt-4 border-t border-border/40">
              <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider">
                Senior Secondary (Class XII) — CBSE
              </p>
              <h3 className="text-lg font-medium">
                Saraswathi Vidyalaya Senior Secondary School, Vadapalani
              </h3>
              <div className="pt-2">
                <span className="text-muted-foreground text-sm">Board Examination Score</span>
                <p className="text-2xl font-semibold text-primary mt-1">
                  <AnimatedNumber value="93.8" delay={400} />%
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Right: Stats */}
          <div className="space-y-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.52, 
                  ease: [0.4, 0, 0.2, 1], 
                  delay: 0.15 + index * 0.09 
                }}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/40"
              >
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-xl font-medium">{stat.value}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">{stat.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
