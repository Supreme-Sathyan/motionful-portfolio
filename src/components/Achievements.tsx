import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const achievements = [
  {
    title: 'Smart India Hackathon (Internal Round – SVCE)',
    description: 'Secured Top 50 position at college level; shortlisted among Top 6 teams out of 500+ teams nationwide in the problem statement evaluation phase.',
  },
  {
    title: 'Visualizing Web Development 2025',
    description: 'Achieved Top 3 position for frontend and visualization excellence, conducted by DSC SVCE.',
  },
  {
    title: 'Eclearnix Hackathon',
    description: 'Reached the final round, leading to an internship opportunity based on performance and technical contribution.',
  },
];

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  return (
    <section id="achievements" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl font-semibold mb-6"
        >
          Achievements
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mb-12"
        >
          Participated in multiple national and college-level hackathons, focusing on real-world problem solving and rapid prototyping.
        </motion.p>

        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.45,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.2 + index * 0.11,
              }}
              className="p-6 rounded-lg bg-secondary/30 border border-border/40 hover:border-primary/30 transition-colors duration-300"
            >
              <h3 className="text-lg font-medium text-foreground mb-2">
                {achievement.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
