import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: string;
  delay: number;
}

const AnimatedNumber = ({ value, delay }: AnimatedNumberProps) => {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-35%' });
  
  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        // Check if value is a number
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          let start = 0;
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
    <section id="about" ref={sectionRef} className="py-32 relative">
      <div className="section-fade absolute inset-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl font-semibold mb-16"
        >
          About
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="space-y-6"
          >
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
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
              <div>
                <span className="text-muted-foreground">CGPA</span>
                <p className="text-2xl font-semibold text-gradient mt-1">
                  <AnimatedNumber value="8.388" delay={200} />
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Graduation</span>
                <p className="text-2xl font-semibold mt-1">
                  <AnimatedNumber value="2027" delay={300} />
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
                className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-border/50"
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
