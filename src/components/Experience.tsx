import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const workExperience = [
  {
    title: 'Project Management Intern',
    company: 'ECLearnix Edtech Private Limited',
    type: 'Internship',
    duration: 'Dec 2025 - Jan 2026',
    location: 'Chennai, Tamil Nadu, India · Remote',
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  
  return (
    <section id="experience" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl font-semibold mb-16"
        >
          Work Experience
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-12">
            {workExperience.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.52, 
                  ease: [0.4, 0, 0.2, 1], 
                  delay: 0.1 + index * 0.09 
                }}
                className="relative pl-12 md:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-8 w-2 h-2 bg-primary rounded-full -translate-x-1/2 mt-2" />
                
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0, 0.2, 1], 
                    delay: 0.15 + index * 0.09 
                  }}
                >
                  <span className="text-xs font-mono uppercase tracking-wider text-primary/80">
                    {exp.type}
                  </span>
                  <h3 className="text-lg font-medium mt-1">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {exp.company}
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1], 
                      delay: 0.24 + index * 0.09 
                    }}
                    className="text-xs text-muted-foreground/70 mt-2 space-y-0.5"
                  >
                    <p>{exp.duration}</p>
                    <p>{exp.location}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
