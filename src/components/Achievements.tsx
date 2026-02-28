import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const achievements = [
  {
    title: 'Visa 24-Hour AI Hackathon – IIT Madras',
    description: 'Advanced to the final round, placing among the Top 10 teams out of 500+ teams, following preliminary evaluation rounds focused on AI-driven solutions.',
  },
  {
    title: 'Smart India Hackathon (Internal Round – SVCE)',
    description: 'Secured Top 50 position at the college level; waitlisted at the national evaluation stage, ranking among the Top 6 teams out of 500+ teams nationwide in the problem statement evaluation phase.',
  },
  {
    title: 'Visualising Web Development 2025',
    description: 'Achieved Top 3 position for frontend and visualisation excellence, conducted by DSC SVCE.',
  },
  {
    title: 'ECLearnix Hackathon',
    description: 'Reached the final round, leading to an internship opportunity based on performance and technical contribution.',
  },
];

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  return (
    <section id="achievements" ref={sectionRef} className="py-32 relative shape-blur">
      <div className="container mx-auto px-6">
        {/* Section heading with scroll reveal */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl font-semibold mb-6"
        >
          Achievements
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mb-12"
        >
          Participated in multiple national and college-level hackathons, focusing on real-world problem solving and rapid prototyping.
        </motion.p>

        {/* Animated list - items animate one by one */}
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.2 + index * 0.1,
              }}
              className="p-6 rounded-xl bg-secondary/20 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
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