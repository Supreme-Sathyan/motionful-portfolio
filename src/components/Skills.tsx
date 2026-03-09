import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Brain, Database, Layout, Wrench } from 'lucide-react';

const skillGroups = [
  {
    category: 'Backend',
    icon: Server,
    skills: ['Flask', 'Node.js', 'RESTful APIs'],
  },
  {
    category: 'AI / ML',
    icon: Brain,
    skills: ['Pandas', 'Scikit-learn', 'Gemini API'],
  },
  {
    category: 'Databases',
    icon: Database,
    skills: ['MySQL', 'Supabase'],
  },
  {
    category: 'Frontend',
    icon: Layout,
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    category: 'Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Vercel'],
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.52, 
                  ease: [0.4, 0, 0.2, 1], 
                  delay: 0.1 + groupIndex * 0.08 
                }}
                className="p-5 rounded-xl bg-card/60 border border-border/40 hover:border-primary/20 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/8 group-hover:bg-primary/12 transition-colors duration-200">
                    <Icon className="h-4 w-4 text-primary/80" />
                  </div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.4, 0, 0.2, 1], 
                        delay: 0.15 + groupIndex * 0.08 + skillIndex * 0.06 
                      }}
                      className="px-3 py-1.5 rounded-lg bg-secondary/80 text-secondary-foreground text-sm font-medium border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;