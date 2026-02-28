import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  problem: string;
  tech: string[];
  outcome: string;
  origin?: string;
  type?: string;
  liveDemo?: string;
  isResearch?: boolean;
}

const projects: Project[] = [
  {
    title: 'Data Quality Intelligence Platform',
    problem: 'Privacy-first GenAI-powered data quality for enterprise payment systems',
    tech: ['TypeScript', 'Supabase Edge Functions', 'Gemini API'],
    outcome: 'Real-time multi-dimensional CSV analysis with compliance-aware insights',
    origin: 'IIT Madras Visa 24-Hour AI Hackathon',
    liveDemo: 'https://payment-quality-ai.vercel.app/',
  },
  {
    title: 'E-R Homie',
    problem: 'AI-driven emotion-aware smart home system',
    tech: ['CNN', 'SVM', 'LSTM', 'Multimodal Sensing'],
    outcome: '~85% classification accuracy with sub-2-second response times',
    type: 'Published Research Paper',
    isResearch: true,
  },
  {
    title: 'Jharkhand Tourism Platform',
    problem: 'Smart tourism experience for SIH',
    tech: ['React', 'Node.js', 'Supabase', 'Gemini API'],
    outcome: 'Smart itinerary planner with AI chatbot',
    origin: 'Backend & deployment (Vercel)',
    liveDemo: 'https://jharkhand-lovat.vercel.app',
  },
  {
    title: 'VERDIC-AI',
    problem: 'Flask-based legal workflow optimisation with NLP & ML',
    tech: ['Flask', 'NLP', 'ML', 'Gemini API'],
    outcome: 'Contract review, compliance analysis, precedent search & AI legal chatbot',
    origin: 'Ease the Error Hackathon',
  },
  
];

const ProjectCard = ({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const CardContent = (
    <div 
      className="transition-transform duration-200"
      style={{ transform: isHovered ? 'translateY(-2px)' : 'translateY(0)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          {project.isResearch && (
            <span className="text-xs font-mono uppercase tracking-wider text-primary/80">
              Published Paper
            </span>
          )}
        </div>
        {project.liveDemo && (
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        )}
      </div>
      
      <p className="text-muted-foreground text-sm mb-4">{project.problem}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-xs font-mono bg-secondary/60 rounded-lg text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <p className="text-sm text-foreground/90">{project.outcome}</p>
      
      {project.origin && (
        <p className="text-xs text-muted-foreground/70 mt-3 font-mono">
          {project.origin}
        </p>
      )}
    </div>
  );

  const cardClasses = "group card-elevated card-reflective card-spotlight p-6 cursor-pointer block rounded-xl";
  const cardStyle = {
    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
    boxShadow: isHovered 
      ? '0 12px 40px -8px hsl(0 0% 0% / 0.45), 0 0 0 1px hsl(169 40% 51% / 0.1)' 
      : '0 1px 3px hsl(0 0% 0% / 0.3), 0 4px 12px -2px hsl(0 0% 0% / 0.4)',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.52, 
        ease: [0.4, 0, 0.2, 1], 
        delay: 0.14 + index * 0.1 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {project.liveDemo ? (
        <a
          href={project.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClasses}
          style={cardStyle}
        >
          {CardContent}
        </a>
      ) : (
        <div className={cardClasses} style={cardStyle}>
          {CardContent}
        </div>
      )}
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });
  const [dotGridVisible, setDotGridVisible] = useState(false);

  // Fade in dot grid when section is in view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setDotGridVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);
  
  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className={`py-32 relative grid-motion ${dotGridVisible ? 'visible' : ''}`}
    >
      <div className="section-fade absolute inset-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl font-semibold mb-4"
        >
          Projects & Research
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.07 }}
          className="text-muted-foreground mb-16 max-w-xl"
        >
          Building intelligent solutions across legal tech, smart environments, and tourism
        </motion.p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;