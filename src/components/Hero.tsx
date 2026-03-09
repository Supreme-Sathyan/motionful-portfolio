import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Download, Linkedin } from 'lucide-react';
import LetterGlitch from './LetterGlitch';

// Split text animation for hero headline
const SplitText = ({ children, className }: { children: string; className?: string }) => {
  const words = children.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1], 
            delay: i * 0.07 
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Blur text animation for subheading
const BlurText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay }}
    >
      {children}
    </motion.span>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Letter Glitch Background */}
      <LetterGlitch glitchSpeed={80} centerVignette={true} smooth={true} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-mono text-primary tracking-wider uppercase">Open to Opportunities</span>
          </motion.div>
          
          {/* Name - Split Text Animation */}
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-4">
            <SplitText>S Sathyan</SplitText>
          </h1>
          
          {/* Title - Blur Text Animation */}
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-6">
            <BlurText delay={0.35}>
              Backend & AI-Focused Computer Science Engineer
            </BlurText>
          </p>
          
          {/* Subheading - Blur Text Animation */}
          <p className="text-lg text-muted-foreground/70 mb-12 max-w-xl">
            <BlurText delay={0.5}>
              Building intelligent systems, legal tech, and AI-driven platforms
            </BlurText>
          </p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            {/* View Projects */}
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View Projects
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>

            {/* Resume */}
            <Button
              variant="outline"
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10 transition-colors duration-200"
              asChild
            >
              <a
                href="/S2resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>

            {/* GitHub */}
            <Button
              variant="outline"
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10 transition-colors duration-200"
              asChild
            >
              <a
                href="https://github.com/Supreme-Sathyan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>

            {/* LinkedIn */}
            <Button
              variant="outline"
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10 transition-colors duration-200"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/sathyan-s-aa7170321/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
