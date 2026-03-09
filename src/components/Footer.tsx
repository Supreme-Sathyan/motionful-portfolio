import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="py-20 border-t border-border/30 contact-veil relative">
      <div className="container mx-auto px-6">
        {/* Contact Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Identity */}
          <div>
            <p className="font-mono text-sm text-primary mb-2">S Sathyan</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Backend & AI-Focused Computer Science Engineer
            </p>
          </div>
          
          {/* Direct Contact */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60 mb-3">Contact</p>
            <a
              href="mailto:supremesathyan@gmail.com"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Mail className="h-4 w-4 text-primary/60" />
              supremesathyan@gmail.com
            </a>
            <a
              href="tel:+917824020884"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Phone className="h-4 w-4 text-primary/60" />
              +91 7824020884
            </a>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary/60" />
              Chennai, Tamil Nadu, India
            </div>
          </div>
          
          {/* Socials */}
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60 mb-3">Profiles</p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Supreme-Sathyan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 border border-border/40 hover:border-primary/30"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sathyan-s-aa7170321/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 border border-border/40 hover:border-primary/30"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} S Sathyan. Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;