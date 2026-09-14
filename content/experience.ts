export type Role = {
  period: string;
  title: string;
  org: string;
  blurb: string;
  current?: boolean;
};

export const roles: Role[] = [
  {
    period: 'Jun 2026 — now',
    title: 'Platform Engineer, GCP & Observability',
    org: 'Ccript Agency',
    blurb:
      'Built ServeScale, a Kubernetes native platform for deploying, scaling, monitoring and benchmarking LLMs on GPU with vLLM. Migrated a multi brand franchise reporting platform off a third party dashboard onto a native presentation layer, then repaired the KPI accuracy, filtering, location mappings and BigQuery reconciliation underneath it. GCP native monitoring, logging and operational runbooks.',
    current: true,
  },
  {
    period: 'Oct 2025 — Apr 2026',
    title: 'DevOps Engineer',
    org: 'Mediatiz Foundation',
    blurb:
      'Owned the AWS estate for an LMS and mobile app at 1M+ users. Cut spend 30%, built the CI/CD for four codebases, and shipped a self hosted LLM tutor to keep student data in house.',
  },
  {
    period: 'Dec 2023 — Oct 2025',
    title: 'DevOps Engineer',
    org: 'Poshmaal Technologies',
    blurb:
      'Led the AWS to on premises migration of an IoT SaaS platform, then rebuilt its dev, staging and production environments with full stack observability and a K3s GitOps cluster for ERP workloads.',
  },
];

export const credentials = [
  'BS Software Engineering, FAST-NUCES Islamabad, 2020 to 2025',
  'AWS Solutions Architect and CKA in progress',
  'RocketDevs vetted talent',
];

export const skills = [
  {
    group: 'Cloud & infrastructure',
    items: ['AWS (ECS, RDS, ALB, Lambda, CloudFront, WAF)', 'GCP (GKE, BigQuery, Pub/Sub, Cloud Run)', 'Azure AKS', 'Linux, nginx, bare metal'],
  },
  {
    group: 'Platform & delivery',
    items: ['Kubernetes, K3s, EKS', 'ArgoCD, Helm, GitOps', 'Terraform, Ansible', 'GitHub Actions, Jenkins, blue/green'],
  },
  {
    group: 'Observability & security',
    items: ['Prometheus, Grafana, Loki', 'OpenTelemetry, Jaeger, eBPF', 'Datadog, CloudWatch', 'WAF, TLS, hardening, OWASP testing'],
  },
  {
    group: 'AI systems & backend',
    items: ['RAG, FAISS, pgvector, MiniLM', 'Gemini, Ollama, local LLMs', 'FastAPI, Django, Spring Boot', 'PostgreSQL, MySQL, Redis, Kafka'],
  },
];
