import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll';
import SectionTitle from '../ui/SectionTitle';
import { Server, Cloud, Database, GitBranch, LineChart, Shield } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const expertise = [
    {
      icon: <Cloud size={24} />,
      title: 'Cloud & Infrastructure',
      description: 'AWS (EC2, S3, RDS, Lambda, ELB), Terraform, Ansible, Infrastructure as Code'
    },
    {
      icon: <Server size={24} />,
      title: 'Containerization',
      description: 'Docker, Kubernetes, Helm, Docker Compose, Container Orchestration, Microservices'
    },
    {
      icon: <GitBranch size={24} />,
      title: 'CI/CD & MLOps',
      description: 'Jenkins, GitHub Actions, GitLab CI, ArgoCD, MLflow, Airflow, Model Deployment'
    },
    {
      icon: <LineChart size={24} />,
      title: 'Monitoring & Security',
      description: 'Prometheus, Grafana, ELK Stack, SSL/TLS, RBAC, Security Scanning, Vault'
    },
    {
      icon: <Database size={24} />,
      title: 'Databases & Messaging',
      description: 'PostgreSQL, MySQL, Redis, MongoDB, Kafka, RabbitMQ, Database Clustering'
    },
    {
      icon: <Shield size={24} />,
      title: 'Web & API',
      description: 'Nginx, Apache, FastAPI, Load Balancers, API Gateway, Service Mesh, REST APIs'
    }
  ];

  return (
    <section id="about" className="section-padding bg-dark-400">
      <div className="container-custom">
        <SectionTitle 
          title="About Me"
          subtitle="Experienced DevOps Engineer specializing in cloud infrastructure, containerization, and MLOps pipelines."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            ref={ref}
            className="order-2 lg:order-1"
          >
            <div className="space-y-4 text-slate-300">
              <p>
                As a DevOps Engineer, I bring a wealth of experience in designing, implementing, and managing robust cloud infrastructure
                and containerized applications. My expertise spans across multiple domains including cloud services, containerization, 
                CI/CD pipelines, and MLOps.
              </p>
              <p>
                I've successfully reduced infrastructure costs by <span className="text-white font-medium">40%</span> while maintaining 
                <span className="text-white font-medium"> 99.9%</span> uptime for production systems serving <span className="text-white font-medium">10K+</span> users.
                My approach combines technical expertise with a focus on business outcomes, ensuring that the systems I build
                are not only technically sound but also align with organizational goals.
              </p>
              <p>
                Currently based in Islamabad, Pakistan, I'm passionate about leveraging cutting-edge technologies to solve 
                complex problems and improve system reliability, performance, and security.
              </p>
              
              <div className="pt-4">
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="btn-primary inline-block cursor-pointer"
                >
                  Let's Connect
                </Link>
              </div>
            </div>
          </motion.div>
          
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="text-primary-400 mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;