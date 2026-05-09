import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import TimelineItem from '../ui/TimelineItem';

const Experience: React.FC = () => {
  const experiences = [
    {
      position: 'DevOps Engineer',
      company: 'Mediatiz Foundation',
      period: 'Oct 2025 – Present',
      description: [
        'Architected AWS production infrastructure (ECS/Fargate, RDS, ALB, CloudFront, WAF, Lambda, Route 53, IAM, VPC) supporting 1M+ active users with 20–30K concurrent requests; sustained 99.9% uptime SLA',
        'Reduced AWS cloud costs by 30% through CloudWatch-driven auto-scaling, ECS task-definition tuning, and workload-aware right-sizing; authored cost-tracking dashboards adopted org-wide',
        'Designed GitHub Actions CI/CD pipelines for Android (APK/AAB), Laravel, Django, and Next.js with zero-downtime ECS rollouts, Slack deployment alerts, and Google Play Console automation',
        'Deployed PyBot — Django + Ollama (Gemma 2B) local LLM tutor — eliminating external LLM API costs and addressing data-residency requirements for student PII',
        'Built serverless Slack-to-Google Sheets reporting pipeline on AWS Lambda, API Gateway, EventBridge, and S3 serving 8 departments daily',
        'Ran OWASP security testing (SQLi, CSRF, brute-force) using Kali Linux, SQLMap, and SonarQube; validated WAF rules and produced remediation reports adopted by the dev team'
      ]
    },
    {
      position: 'DevOps Engineer',
      company: 'Poshmaal Technologies',
      period: 'Dec 2023 – Oct 2025',
      description: [
        'Led full AWS-to-VPS migration of firefly.online (IoT platform) across EC2, ALB, RDS, ECS/ECR, VPC, S3, WAF, and Route 53 with measurable monthly cost reduction while maintaining client SLAs',
        'Designed Blue-Green deployment strategy for Node.js → Spring Boot cutover; zero-downtime production switchover via Nginx upstream switching',
        'Architected Dev/Staging/Production environments; containerized and orchestrated 8+ microservices on Docker and Kubernetes with Helm chart management, HPA, RBAC, and resource quotas',
        'Built Jenkins + GitHub Actions CI/CD pipelines — parallel build stages, artifact caching, automated rollback triggers — reducing deployment cycle time by ~70%',
        'Implemented ArgoCD GitOps for declarative, drift-detected deployments across all environments',
        'Full-stack observability with Prometheus, Grafana, Loki, Datadog APM — custom SLO dashboards and PagerDuty alert routing'
      ]
    },
    {
      position: 'Independent DevOps Consultant',
      company: 'Self-Employed (Fiverr & Upwork)',
      period: 'Dec 2021 – Nov 2023',
      description: [
        'Delivered containerization, CI/CD, server administration, and cloud infrastructure solutions for 30+ SMB and enterprise clients worldwide; 5-star average · ~40% YoY revenue growth through repeat clients and referrals',
        'Ran Kubernetes in production across EKS (AWS), AKS (Azure), and GKE (GCP) with Helm chart management, HPA, Ingress controllers, and RBAC; deployed Spring Boot and Node.js microservices with horizontal pod autoscaling',
        'Integrated ArgoCD GitOps pipelines with automated sync, drift detection, and multi-environment rollback across dev/staging/production',
        'Configured Datadog APM, infrastructure monitoring, and custom dashboards for client environments; set up SLOs and PagerDuty escalation routing',
        'Automated server administration with Bash and Ansible — provisioning, patching, backup scheduling, and configuration management across 50+ Linux hosts'
      ]
    }
  ];

  return (
    <section id="experience" className="section-padding bg-dark-400">
      <div className="container-custom">
        <SectionTitle 
          title="Work Experience"
          subtitle="4+ years designing, deploying, and operating cloud-native infrastructure at scale."
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
