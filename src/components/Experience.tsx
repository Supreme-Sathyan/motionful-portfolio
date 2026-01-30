import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const workExperience = [
  {
    title: 'Project Management Intern',
    company: 'ECLearnix EdTech Pvt. Ltd.',
    type: 'Internship',
    duration: 'Dec 2025 – Jan 2026',
    location: 'Remote (Online) | Coimbatore, Tamil Nadu',
    bullets: [
      'Conducted competitor and market analysis of 6+ EdTech platforms and performed UX evaluations across 10+ website pages',
      'Analysed 5+ operational and engagement risks in online academic events with structured mitigation strategies',
      'Evaluated Instagram, LinkedIn, and YouTube content, reviewing 30+ posts/videos for engagement patterns',
      'Documented 20+ business and user requirements into a usability-focused event listing prototype',
    ],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  
  return (
    <section id="experience" ref={sectionRef} className={`py-32 relative shape-blur dither ${isInView ? 'visible' : ''}`}>
      <div className="container mx-auto px-6">
        {/* Section heading with scroll reveal */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl font-semibold mb-16"
        >
          Work Experience
        </motion.h2>
        
        {/* Stepper / Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border origin-top" 
          />
          
          <div className="space-y-12">
            {workExperience.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.4, 0, 0.2, 1], 
                  delay: 0.3 + index * 0.1 
                }}
                className="relative pl-12 md:pl-20"
              >
                {/* Dot - animated separately */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.4, 0, 0.2, 1], 
                    delay: 0.4 + index * 0.1 
                  }}
                  className="absolute left-0 md:left-8 w-2 h-2 bg-primary rounded-full -translate-x-1/2 mt-2" 
                />
                
                {/* Content - staggered animation */}
                <div>
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1], 
                      delay: 0.35 + index * 0.1 
                    }}
                    className="text-xs font-mono uppercase tracking-wider text-primary/80 block"
                  >
                    {exp.type}
                  </motion.span>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1], 
                      delay: 0.4 + index * 0.1 
                    }}
                    className="text-lg font-medium mt-1"
                  >
                    {exp.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1], 
                      delay: 0.45 + index * 0.1 
                    }}
                    className="text-sm text-muted-foreground mt-1"
                  >
                    {exp.company}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1], 
                      delay: 0.5 + index * 0.1 
                    }}
                    className="text-xs text-muted-foreground/70 mt-2 space-y-0.5"
                  >
                    <p>{exp.duration}</p>
                    <p>{exp.location}</p>
                  </motion.div>

                  {exp.bullets && (
                    <motion.ul
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.4, 0, 0.2, 1], 
                        delay: 0.55 + index * 0.1 
                      }}
                      className="mt-4 space-y-2"
                    >
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-sm text-muted-foreground/90 flex items-start gap-2">
                          <span className="text-primary/60 mt-1.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
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