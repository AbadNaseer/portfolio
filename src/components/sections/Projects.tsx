import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'SniperAI — Live Crypto Futures Signal Platform',
      description: 'Real-time Binance scanner with multi-timeframe technical analysis (EMA, RSI, VWAP, volume, S/R), adaptive scoring, and risk-defined execution. Deployed on Ubuntu VPS behind Nginx with kernel-level tuning (SCHED_FIFO, CPU affinity, mlockall) for low-latency execution. End-to-end solo ownership under the FalcoFlow brand.',
      techStack: ['Python', 'Binance API', 'Nginx', 'SCHED_FIFO', 'Real-Time Systems'],
      year: '2025 — Present',
      url: 'https://sniperai.falcoflow.com'
    },
    {
      title: 'AI DevOps Log Analysis System',
      description: 'NLP-powered anomaly detection, issue classification, and automated root-cause analysis on infrastructure logs — reduced MTTR by ~45%. End-to-end MLOps pipeline with MLflow (tracking + registry), DVC (data/model versioning), Airflow (orchestration), and a containerized FastAPI inference microservice.',
      techStack: ['Python', 'FastAPI', 'MLflow', 'Airflow', 'DVC', 'HuggingFace', 'Docker'],
      year: '2024',
      githubUrl: 'https://github.com/AbadNaseer/mlops-course'
    },
    {
      title: 'Kubernetes Observability Platform',
      description: 'Full observability stack on EKS: Prometheus + Grafana for metrics, EFK (Elasticsearch, Fluentbit, Kibana) for logs, Jaeger + OpenTelemetry for distributed traces. Integrated groundcover (eBPF) for zero-instrumentation kernel-level visibility; custom PromQL alerts and SLO dashboards.',
      techStack: ['Kubernetes', 'Prometheus', 'Grafana', 'EFK', 'Jaeger', 'OpenTelemetry', 'eBPF'],
      year: '2025',
      githubUrl: 'https://github.com/AbadNaseer/observability'
    },
    {
      title: 'Infrastructure-as-Code Task App',
      description: 'Full-stack authenticated task app demonstrating end-to-end IaC: Terraform-provisioned VM, Supabase (Auth + RLS database), Dockerized builds, and GitHub Actions CI/CD — infrastructure, application, and deployment fully version-controlled and reproducible.',
      techStack: ['Next.js', 'Supabase', 'Docker', 'Terraform', 'GitHub Actions'],
      year: '2025',
      githubUrl: 'https://github.com/AbadNaseer/home_task'
    },
    {
      title: 'RAG Handbook Assistant',
      description: 'Retrieval-Augmented Generation chatbot for FYP handbook Q&A. Local embeddings (MiniLM-L6-v2), FAISS vector search, and Ollama LLM — runs fully offline with page-level citations and threshold-based refusal.',
      techStack: ['Python', 'FAISS', 'MiniLM-L6-v2', 'Ollama', 'Streamlit'],
      year: '2025',
      githubUrl: 'https://github.com/AbadNaseer/RAG-Handbook-bot'
    }
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <SectionTitle 
          title="Featured Projects"
          subtitle="A showcase of my most significant and impactful projects."
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