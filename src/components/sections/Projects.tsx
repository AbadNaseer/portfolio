import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'SniperAI — Live Crypto Futures Signal Platform',
      description: 'Real-time Binance scanner with multi-timeframe technical analysis (EMA, RSI, VWAP, S/R), adaptive scoring, and risk-defined execution. Deployed on Ubuntu VPS behind Nginx with kernel-level tuning (SCHED_FIFO, CPU affinity, mlockall) for minimum-latency execution. End-to-end solo ownership under the FalcoFlow brand.',
      techStack: ['Python', 'Binance API', 'Nginx', 'SCHED_FIFO', 'Real-Time Systems'],
      year: '2025 — Present',
      url: 'https://sniperai.falcoflow.com'
    },
    {
      title: 'Kubernetes GitOps Platform',
      description: 'Production-grade GitOps pipeline using ArgoCD App-of-Apps pattern with Helm-managed microservices. Automated sync, drift detection, and multi-environment rollout (dev → staging → prod). HPA, Nginx Ingress with TLS, RBAC, NetworkPolicies, and External Secrets Operator. GitHub Actions CI builds images, pushes to ECR, updates Helm values — ArgoCD auto-deploys.',
      techStack: ['ArgoCD', 'Helm', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS ECR'],
      year: '2025',
      githubUrl: 'https://github.com/AbadNaseer/k8s-gitops-argocd'
    },
    {
      title: 'Azure AKS Platform (Terraform)',
      description: 'Production AKS cluster provisioned with Terraform — system + user node pools across 3 AZs, Azure CNI with Calico network policy, Workload Identity (OIDC) for pod-level IAM, Key Vault CSI secret rotation, ACR with geo-replication, and Azure Monitor Container Insights. GitHub Actions CI/CD with terraform plan on PR and apply on merge.',
      techStack: ['Azure', 'AKS', 'Terraform', 'Workload Identity', 'Key Vault', 'ACR'],
      year: '2025',
      githubUrl: 'https://github.com/AbadNaseer/terraform-azure-aks'
    },
    {
      title: 'Datadog Monitoring Stack (as Code)',
      description: 'Datadog monitoring fully managed as code via Terraform and Helm. Covers APM, infrastructure metrics, log management, SLOs with burn-rate alerting, pod crash detection, node NotReady alerts, and PagerDuty routing. Helm-deployed Datadog Agent with Cluster Agent for HPA custom metrics. Log exclusion filters for cost control.',
      techStack: ['Datadog', 'Terraform', 'Helm', 'Kubernetes', 'PagerDuty', 'SLOs'],
      year: '2025',
      githubUrl: 'https://github.com/AbadNaseer/datadog-infra-monitoring'
    },
    {
      title: 'GKE Autopilot Platform (Terraform)',
      description: 'GKE Autopilot cluster on GCP provisioned with Terraform — private cluster, VPC-native alias IPs, Workload Identity Federation (no long-lived keys), Cloud Armor WAF with OWASP rule set + rate limiting, Binary Authorization, Google Managed Prometheus, and Artifact Registry. CI/CD via GitHub Actions OIDC — zero service account key files.',
      techStack: ['GCP', 'GKE Autopilot', 'Terraform', 'Cloud Armor', 'Workload Identity', 'Managed Prometheus'],
      year: '2025',
      githubUrl: 'https://github.com/AbadNaseer/terraform-gke-autopilot'
    },
    {
      title: 'AI DevOps Log Analysis System',
      description: 'NLP-powered anomaly detection, issue classification, and automated root-cause analysis on infrastructure logs — reduced MTTR by ~45%. End-to-end MLOps pipeline: MLflow (experiment tracking + model registry), DVC (data versioning), Airflow (orchestration), containerized FastAPI inference service deployed on Kubernetes. Custom models served in-house via Ollama for privacy and cost control.',
      techStack: ['Python', 'FastAPI', 'MLflow', 'Airflow', 'DVC', 'HuggingFace', 'Docker'],
      year: '2024',
      githubUrl: 'https://github.com/AbadNaseer/mlops-course'
    },
    {
      title: 'Kubernetes Observability Platform',
      description: 'Full observability stack on EKS: Prometheus + Grafana (metrics), EFK — Elasticsearch, Fluentbit, Kibana — (logs), Jaeger + OpenTelemetry (distributed traces), Datadog APM (application perf). Integrated groundcover (eBPF) for zero-instrumentation kernel-level visibility. Custom PromQL SLO dashboards and PagerDuty escalation routing.',
      techStack: ['Kubernetes', 'Prometheus', 'Grafana', 'Datadog', 'EFK', 'Jaeger', 'eBPF'],
      year: '2025',
      githubUrl: 'https://github.com/AbadNaseer/observability'
    },
    {
      title: 'Infrastructure-as-Code Task App',
      description: 'Full-stack authenticated task app demonstrating end-to-end IaC: Terraform-provisioned VM, Supabase (Auth + RLS database), Dockerized builds, and GitHub Actions CI/CD — infrastructure, application, and deployment fully version-controlled and reproducible.',
      techStack: ['Next.js', 'Supabase', 'Docker', 'Terraform', 'GitHub Actions'],
      year: '2025',
      githubUrl: 'https://github.com/AbadNaseer/home_task'
    }
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <SectionTitle 
          title="Featured Projects"
          subtitle="Production infrastructure, GitOps platforms, observability stacks, and AI/MLOps systems."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              year={project.year}
              url={project.url}
              githubUrl={project.githubUrl}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
