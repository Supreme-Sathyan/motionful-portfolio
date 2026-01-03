import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center noise">
      {/* Flat dark background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Very subtle glow - controlled */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px]" />
      
      {/* Bottom gradient fade - grounds the section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl md:text-7xl font-semibold tracking-tight mb-4"
          >
            S Sathyan
          </motion.h1>
          
          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
            className="text-xl md:text-2xl text-muted-foreground font-light mb-6"
          >
            Backend & AI-Focused Computer Science Engineer
          </motion.p>
          
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: 0.16 }}
            className="text-lg text-muted-foreground/70 mb-12 max-w-xl"
          >
            Building intelligent systems, legal tech, and AI-driven platforms
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: 0.24 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10 transition-colors duration-200"
              asChild
            >
              <a href="https://github.com/Supreme-Sathyan" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.45 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-muted-foreground/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-1.5 bg-muted-foreground/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
