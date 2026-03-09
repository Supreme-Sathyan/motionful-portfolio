import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, BookOpen } from 'lucide-react';

const certifications = [
  { name: 'Software Testing', issuer: 'NPTEL (IIT System)', icon: 'nptel' },
  { name: 'Java Programming Fundamentals', issuer: 'Infosys Springboard', icon: 'infosys' },
  { name: 'Java I/O with Case Studies', issuer: 'Infosys Springboard', icon: 'infosys' },
  { name: 'Multithreading in Java', issuer: 'Infosys Springboard', icon: 'infosys' },
];

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  
  return (
    <section ref={sectionRef} className="py-32 relative shape-blur">
      <div className="section-fade absolute inset-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl font-semibold mb-16"
        >
          Certifications
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                ease: [0.4, 0, 0.2, 1], 
                delay: 0.1 + index * 0.1 
              }}
              className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-200 group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                {cert.icon === 'nptel' ? (
                  <BookOpen className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors duration-200 shrink-0" />
                ) : (
                  <Award className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors duration-200 shrink-0" />
                )}
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">
                  {cert.issuer}
                </span>
              </div>
              <p className="font-medium text-sm leading-snug">{cert.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;