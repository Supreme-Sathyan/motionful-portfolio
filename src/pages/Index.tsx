import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Achievements from '@/components/Achievements';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden global-noise">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Certifications />
      <Footer />
    </main>
  );
};

export default Index;
