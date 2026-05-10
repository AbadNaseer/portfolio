import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Download, MessageSquare } from 'lucide-react';
import TerminalEffect from '../ui/TerminalEffect';

const Hero: React.FC = () => {
  const commands = [
    'cd abad-naseer-portfolio',
    'kubectl apply -f argocd/app-of-apps.yaml',
    'terraform apply -var-file=prod.tfvars',
    'helm upgrade --install api ./charts/api-service',
    'Deployment successful! 1M+ users served · 99.9% uptime'
  ];

  return (
    <section 
      id="hero" 
      className="min-h-screen pt-24 pb-12 flex items-center relative overflow-hidden"
    >
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
            <h2 className="text-2xl md:text-3xl text-slate-300 font-medium mb-3">
              DevOps &amp; Cloud Engineer · <span className="gradient-text">3+ Years</span>
            </h2>
            <h3 className="text-lg text-slate-400 font-mono mb-6">
              AWS · Kubernetes · GitOps · Terraform · DevSecOps · AI/MLOps
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {['1M+ Users Served','99.9% Uptime','30% Cost Reduction','70% Faster Deploys','30+ Client Projects'].map(m => (
                <span key={m} className="px-3 py-1 bg-primary-900/30 border border-primary-700/40 rounded-full text-primary-300 text-xs font-mono">{m}</span>
              ))}
            </div>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">
              I architect and operate cloud-native infrastructure at scale — AWS-native platforms serving 1M+ users,
              GitOps pipelines with ArgoCD &amp; Helm, full-stack observability, and AI/MLOps infrastructure.
              Open to remote worldwide.
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
                href="/resume.pdf"
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
