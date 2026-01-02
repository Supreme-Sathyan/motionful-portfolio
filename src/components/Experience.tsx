import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    title: 'Ease the Error 4.0 & 5.0',
    description: 'National-level hackathons focused on innovative solutions',
    type: 'Hackathon',
  },
  {
    title: 'Visualizing Web Development 2025',
    description: 'Secured Top 3 position in web development competition',
    type: 'Competition',
    highlight: 'Top 3',
  },
  {
    title: 'SIH Internal Hackathon',
    description: 'Selected among Top 50 teams for Smart India Hackathon',
    type: 'Hackathon',
    highlight: 'Top 50',
  },
  {
    title: 'iCUBE',
    description: 'Innovation and incubation program participation',
    type: 'Program',
  },
  {
    title: 'GDSC DevCon 2024',
    description: 'Google Developer Student Clubs developer conference',
    type: 'Conference',
  },
  {
    title: 'D-PREP Program 2025',
    description: 'Placement preparation and skill development program',
    type: 'Program',
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
          Experience & Events
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.52, 
                  ease: [0.4, 0, 0.2, 1], 
                  delay: 0.1 + index * 0.09 
                }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 mt-2" />
                
                {/* Content */}
                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
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
                    <h3 className="text-lg font-medium mt-1 mb-2">
                      {exp.title}
                      {exp.highlight && (
                        <span className="ml-2 text-sm text-primary font-mono">
                          ({exp.highlight})
                        </span>
                      )}
                    </h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.4, 0, 0.2, 1], 
                        delay: 0.24 + index * 0.09 
                      }}
                      className="text-sm text-muted-foreground"
                    >
                      {exp.description}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
