import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award } from 'lucide-react';

const certifications = [
  'Java Programming Fundamentals',
  'Java I/O with Case Studies',
  'Multithreading in Java',
];

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  
  return (
    <section ref={sectionRef} className="py-32 relative">
      <div className="section-fade absolute inset-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl font-semibold mb-16"
        >
          Certifications
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.52, 
                ease: [0.4, 0, 0.2, 1], 
                delay: 0.1 + index * 0.09 
              }}
              className="p-6 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-200 group"
            >
              <Award className="h-5 w-5 text-primary/60 group-hover:text-primary mb-4 transition-colors duration-200" />
              <p className="font-medium">{cert}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
