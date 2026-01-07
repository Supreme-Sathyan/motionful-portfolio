import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillGroups = [
  {
    category: 'Backend',
    skills: ['Flask', 'Node.js', 'REST APIs', 'MySQL', 'Supabase'],
  },
  {
    category: 'Languages',
    skills: ['Python', 'Java', 'C'],
  },
  {
    category: 'Web',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Vercel'],
  },
  {
    category: 'Soft Skills',
    skills: ['Proactive', 'Analytical', 'Collaborative'],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  
  return (
    <section id="skills" ref={sectionRef} className={`py-32 relative dot-grid ${isInView ? 'visible' : ''}`}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl font-semibold mb-16"
        >
          Skills
        </motion.h2>
        
        <div className="space-y-12">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.52, 
                ease: [0.4, 0, 0.2, 1], 
                delay: 0.1 + groupIndex * 0.08 
              }}
            >
              <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1], 
                      delay: 0.15 + groupIndex * 0.08 + skillIndex * 0.09 
                    }}
                    className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm font-medium border border-border/40 hover:border-primary/40 transition-colors duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
