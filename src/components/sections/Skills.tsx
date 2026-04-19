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
    { label: 'AWS (ECS/Fargate, RDS, CloudFront, WAF, Lambda)', percentage: 92 },
    { label: 'Docker & Kubernetes (EKS)', percentage: 90 },
    { label: 'CI/CD (GitHub Actions, Jenkins)', percentage: 92 },
    { label: 'Infrastructure as Code (Terraform, Ansible)', percentage: 85 },
    { label: 'Observability (Prometheus, Grafana, Loki, EFK)', percentage: 88 },
    { label: 'DevSecOps & OWASP Testing', percentage: 82 },
  ];

  const tools = [
    { label: 'AI / MLOps (MLflow, Airflow, DVC, Ollama, RAG)', percentage: 85 },
    { label: 'Kali Linux, SQLMap, SonarQube', percentage: 80 },
    { label: 'Nginx, Blue-Green Deployments', percentage: 90 },
    { label: 'eBPF, OpenTelemetry, Jaeger', percentage: 78 },
    { label: 'Vault, SSL/TLS, fail2ban, UFW', percentage: 85 },
    { label: 'Python, Bash, TypeScript, Go (learning)', percentage: 85 },
  ];

  const terminalCommands = [
    'aws ecs update-service --force-new-deployment',
    'kubectl get pods --all-namespaces',
    'terraform apply -auto-approve',
    'helm upgrade --install obs ./kube-prometheus-stack',
    'sqlmap -u https://target --batch --risk=3'
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
                    <span>AWS Production Ops at 1M+ User Scale (99.9% Uptime)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Cloud Cost Engineering (30% AWS Reduction)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Low/Zero-Downtime Migrations & Blue-Green Deployments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>CI/CD Across Android, Laravel, Django, Next.js, Spring Boot</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>In-House Offensive Security (OWASP, Kali, SQLMap)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Full-Stack Observability (Prometheus, Grafana, EFK, Jaeger, eBPF)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>AI Products End-to-End (Ollama, MLflow, Airflow, RAG, FAISS)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Real-Time Systems (SCHED_FIFO, CPU Affinity, mlockall)</span>
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