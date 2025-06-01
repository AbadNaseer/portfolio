import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import ProgressBar from '../ui/ProgressBar';
import TerminalEffect from '../ui/TerminalEffect';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const technicalSkills = [
    { label: 'AWS Cloud Services', percentage: 90 },
    { label: 'Docker & Kubernetes', percentage: 95 },
    { label: 'CI/CD Pipelines', percentage: 90 },
    { label: 'Infrastructure as Code', percentage: 85 },
    { label: 'Monitoring & Logging', percentage: 85 },
    { label: 'Database Management', percentage: 80 },
  ];

  const tools = [
    { label: 'Jenkins', percentage: 90 },
    { label: 'Terraform', percentage: 85 },
    { label: 'Ansible', percentage: 80 },
    { label: 'Prometheus/Grafana', percentage: 85 },
    { label: 'ELK Stack', percentage: 80 },
    { label: 'GitHub Actions', percentage: 90 },
  ];

  const terminalCommands = [
    'kubectl get pods --all-namespaces',
    'terraform apply -auto-approve',
    'docker-compose up -d',
    'aws ec2 describe-instances',
    'helm install my-release ./chart'
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <SectionTitle 
          title="Technical Skills"
          subtitle="A comprehensive overview of my technical expertise and proficiency levels."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              ref={ref}
            >
              <h3 className="text-xl font-bold mb-6 gradient-text">Core Competencies</h3>
              {technicalSkills.map((skill, index) => (
                <ProgressBar 
                  key={index}
                  label={skill.label}
                  percentage={skill.percentage}
                  delay={index * 0.1}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6 gradient-text">Tools & Technologies</h3>
              {tools.map((tool, index) => (
                <ProgressBar 
                  key={index}
                  label={tool.label}
                  percentage={tool.percentage}
                  color="from-secondary-500 to-primary-500"
                  delay={index * 0.1}
                />
              ))}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-6 gradient-text">DevOps Expertise</h3>
              <div className="card">
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Cloud Infrastructure Design & Implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Containerization & Microservices Architecture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Automated CI/CD Pipeline Configuration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Infrastructure as Code (IaC) Implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Monitoring, Logging & Alerting Systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>High Availability & Disaster Recovery Planning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Database Clustering & Performance Optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Security Implementation & Compliance</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-6 gradient-text">Daily Command Line</h3>
              <TerminalEffect commands={terminalCommands} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;