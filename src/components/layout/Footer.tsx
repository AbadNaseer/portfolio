import React from 'react';
import { Link } from 'react-scroll';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronUp 
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-400 border-t border-slate-800">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Abad Naseer</h2>
            <p className="text-slate-400 max-w-md">
              DevOps Engineer & Cloud Solutions Architect specializing in cloud infrastructure, 
              containerization, and MLOps pipelines.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-4">
              <a 
                href="https://github.com/AbadNaseer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/abadnaseer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:abad.naseerfast@gmail.com" 
                className="text-slate-400 hover:text-white transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <Link
              to="hero"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <span>Back to top</span>
              <ChevronUp size={16} />
            </Link>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-4 md:mb-0">
            <div className="flex items-center gap-1">
              <Phone size={16} className="text-slate-400" />
              <span>(+92) 340-5059429</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={16} className="text-slate-400" />
              <span>abad.naseerfast@gmail.com</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-slate-400" />
              <span>Islamabad, Pakistan</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} Abad Naseer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;