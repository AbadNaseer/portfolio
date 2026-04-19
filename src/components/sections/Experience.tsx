import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import TimelineItem from '../ui/TimelineItem';

const Experience: React.FC = () => {
  const experiences = [
    {
      position: 'DevOps Engineer',
      company: 'Mediatiz Foundation',
      period: 'Oct 2025 - Present',
      description: [
        'Managed AWS infrastructure (ECS/Fargate, RDS, ALB, CloudFront, CloudWatch, SES, Route 53) for Mediatiz LMS and Khudi App serving 1M+ users with 20–30K concurrent requests at peak; sustained 99.9% uptime',
        'Reduced AWS cloud costs by 30% through CloudWatch-driven auto-scaling, ECS task-definition tuning, and workload-aware right-sizing across staging and production clusters',
        'Built GitHub Actions CI/CD pipelines for Android (APK/AAB), Laravel LMS, Django, and Next.js admin with zero-downtime ECS rollouts, Slack alerts, and Google Play Console automation',
        'Architected and deployed PyBot — a Django + Ollama (Gemma 2B) local LLM tutor — eliminating external LLM API costs and addressing data-residency requirements for student PII',
        'Built serverless Slack-to-Google Sheets automation on AWS Lambda, API Gateway, EventBridge, and S3 for daily cross-departmental reporting across 8 departments',
        'Ran in-house OWASP security testing (brute-force, SQL injection, CSRF) on lms.mediatiz.org using Kali Linux, SQLMap, and SonarQube; validated WAF rules and produced remediation reports adopted by the development team'
      ]
    },
    {
      position: 'DevOps Engineer',
      company: 'Poshmaal Technologies',
      period: 'Dec 2023 - Oct 2025',
      description: [
        'Led full AWS-to-self-managed-VPS migration of firefly.online (IoT production platform) across EC2, ALB, RDS, ECS/ECR, VPC, S3, WAF, and Route 53 with measurable monthly cost reduction while maintaining client SLAs',
        'Designed and implemented Blue-Green deployment strategy to run legacy Node.js and new Spring Boot environments in parallel; delivered a low-downtime production cutover via Nginx upstream switching',
        'Architected Dev/Staging/Production environments from scratch on-premises; containerized and orchestrated 8+ microservices on Docker and Kubernetes with Nginx reverse proxy and resource quotas',
        'Built Jenkins + GitHub Actions CI/CD pipelines reducing deployment cycle time by ~70% via parallel build stages, artifact caching, and automated rollback triggers',
        'Implemented full-stack observability with Prometheus, Grafana, and Loki — custom service-level dashboards, real-time alerting, and centralized log aggregation',
        'Hardened all environments with SSL/TLS (Let\'s Encrypt auto-renewal), SSH key restrictions, UFW/iptables firewalls, fail2ban, and Vault-based secrets management'
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