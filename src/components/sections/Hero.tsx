import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Download, MessageSquare } from 'lucide-react';
import TerminalEffect from '../ui/TerminalEffect';

const Hero: React.FC = () => {
  const commands = [
    'cd abad-naseer-portfolio',
    'npm install',
    'npm run build',
    'npm start',
    'Deployment successful! Welcome to my portfolio...'
  ];

  return (
    <section 
      id="hero" 
      className="min-h-screen pt-24 pb-12 flex items-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-dark-500">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-900/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-900/10 blur-[100px] rounded-full"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary-400 font-mono mb-4 inline-block">
              Hello, I'm
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Abad Naseer
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-300 font-medium mb-6">
              DevOps Engineer & <span className="gradient-text">Cloud Solutions Architect</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">
              Specializing in cloud infrastructure, containerization, and MLOps pipelines. 
              I build resilient systems that scale and perform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="btn-primary flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare size={18} />
                Get in Touch
              </Link>
              <a 
                href="/resume-abad.pdf"
                className="flex items-center gap-2 px-7 py-3 font-medium text-white bg-slate-700 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-slate-800 active:scale-105 transition"
                download="Abad-Naseer-Resume.pdf"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-30"></div>
              <TerminalEffect commands={commands} className="relative" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;