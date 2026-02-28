import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Summary = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  
  return (
    <section id="summary" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-3xl"
        >
          <h2 className="text-sm font-mono uppercase tracking-wider text-primary/80 mb-4">
            Professional Summary
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Computer Science undergraduate with hands-on experience in building{' '}
            <span className="text-foreground font-medium">AI-driven and backend systems</span>{' '}
            through national-level hackathons, research publication, and industry internship. 
            Developed GenAI-powered platforms for{' '}
            <span className="text-foreground font-medium">data quality intelligence</span>,{' '}
            <span className="text-foreground font-medium">legal automation</span>, and{' '}
            <span className="text-foreground font-medium">smart home automation</span>, 
            with practical exposure to machine learning, RESTful APIs, and full-stack development.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {['Flask', 'Node.js', 'Applied ML', 'Scalable Problem-Solving'].map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.4, 0, 0.2, 1], 
                  delay: 0.2 + index * 0.08 
                }}
                className="px-3 py-1.5 text-xs font-mono bg-secondary/60 rounded-full text-muted-foreground border border-border/40"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Summary;
