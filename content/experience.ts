export type Role = {
  period: string;
  title: string;
  org: string;
  blurb: string;
  current?: boolean;
};

export const roles: Role[] = [
  {
    period: 'Jun 2026 – now',
    title: 'Platform Engineer, AI Infrastructure',
    org: 'Ccript Agency',
    blurb:
      'End to end product engineering on a Kubernetes native AI inference platform: product requirements into architecture, a K3s control plane provisioned in OpenTofu with remote state, rented GPU capacity joined on demand, vLLM behind AIBrix and Envoy Gateway, and a Prometheus and Grafana layer with the benchmarks to argue about it. Separately, migrated a multi brand franchise reporting platform off a third party dashboard onto native reporting, then repaired the pipelines, KPI accuracy and BigQuery reconciliation underneath it.',
    current: true,
  },
  {
    period: 'Oct 2025 – Apr 2026',
    title: 'DevOps Engineer',
    org: 'Mediatiz Foundation',
    blurb:
      'Owned the AWS estate for an LMS and mobile app at 1M+ users. Cut spend 30%, built the CI/CD for four codebases, and shipped a self hosted LLM tutor to keep student data in house.',
  },
  {
    period: 'Dec 2023 – Oct 2025',
    title: 'DevOps Engineer',
    org: 'Poshmaal Technologies',
    blurb:
      'Led the AWS to on premises migration of an IoT SaaS platform, then rebuilt its dev, staging and production environments with full stack observability and a K3s GitOps cluster for ERP workloads.',
  },
  {
    period: 'Dec 2021 – Nov 2023',
    title: 'DevOps Consultant, freelance',
    org: 'Fiverr & Upwork',
    blurb:
      'Twenty plus containerisation, CI/CD and server infrastructure projects for small business clients. Docker deployments, GitHub Actions, nginx and Certbot, Ansible for repeatable provisioning, and self hosted Kubernetes with Ingress, HPA and RBAC where it was warranted.',
  },
];

export const credentials = [
  'BS Software Engineering, FAST-NUCES Islamabad, 2020 to 2025',
  'AWS Solutions Architect and CKA in progress',
];
