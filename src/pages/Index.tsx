import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Summary from '@/components/Summary';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Achievements from '@/components/Achievements';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <main className="min-h-screen bg-transparent text-foreground overflow-x-hidden global-noise">
      <Navbar />
      <Hero />
      <div className="section-smooth">
        <Summary />
      </div>
      <div className="section-smooth">
        <About />
      </div>
      <div className="section-smooth">
        <Skills />
      </div>
      <div className="section-smooth">
        <Projects />
      </div>
      <div className="section-smooth">
        <Experience />
      </div>
      <div className="section-smooth">
        <Achievements />
      </div>
      <div className="section-smooth">
        <Certifications />
      </div>
      <div className="section-smooth">
        <Footer />
      </div>
      <Chatbot />
    </main>
  );
};

export default Index;
