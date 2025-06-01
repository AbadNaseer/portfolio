import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import TimelineItem from '../ui/TimelineItem';

const Experience: React.FC = () => {
  const experiences = [
    {
      position: 'DevOps Engineer',
      company: 'Poshmaal Technologies',
      period: 'Dec 2023 - Present',
      description: [
        'Architected and deployed Kubernetes clusters with 99.9% uptime, managing 50+ microservices with auto-scaling',
        'Implemented Redis caching and Kafka messaging, improving application performance by 40% and reducing latency',
        'Built CI/CD pipelines with Jenkins and GitHub Actions, achieving zero-downtime deployments for production systems',
        'Configured active-passive database clustering with PostgreSQL, ensuring high availability and disaster recovery',
        'Established comprehensive monitoring with Prometheus and Grafana, reducing incident response time by 60%',
        'Implemented security best practices including RBAC, SSL/TLS encryption, and container vulnerability scanning'
      ]
    },
    {
      position: 'Freelance DevOps Engineer',
      company: 'Remote Consulting',
      period: 'Feb 2023 - Dec 2023',
      description: [
        'Delivered end-to-end DevOps solutions for 15+ clients, specializing in AWS cloud migrations and containerization',
        'Automated infrastructure provisioning using Terraform and Ansible, reducing deployment time by 70%',
        'Implemented monitoring solutions with Prometheus, Grafana, and ELK stack for real-time performance tracking',
        'Designed and implemented CI/CD pipelines for various application stacks including MERN, LAMP, and Java Spring',
        'Provided cloud cost optimization services, helping clients reduce AWS spending by 25-40%'
      ]
    },
    {
      position: 'Cloud Infrastructure Intern',
      company: 'Tech Innovators LLC',
      period: 'Sep 2022 - Jan 2023',
      description: [
        'Assisted in managing AWS infrastructure including EC2, S3, and RDS instances',
        'Configured and maintained CI/CD pipelines using Jenkins and GitLab CI',
        'Implemented logging and monitoring solutions using ELK stack and Prometheus',
        'Participated in containerization initiatives, helping migrate applications to Docker',
        'Contributed to documentation of infrastructure setup and deployment procedures'
      ]
    }
  ];

  return (
    <section id="experience" className="section-padding bg-dark-400">
      <div className="container-custom">
        <SectionTitle 
          title="Work Experience"
          subtitle="My professional journey and key responsibilities in previous roles."
        />
        
        <div className="mt-12">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              position={exp.position}
              company={exp.company}
              period={exp.period}
              description={exp.description}
              isLast={index === experiences.length - 1}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;