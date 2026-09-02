export type Repo = { name: string; blurb: string; chips: string[]; href: string };

export const repos: Repo[] = [
  {
    name: 'k8s-gitops-argocd',
    blurb: 'App of Apps, Helm charts, HPA, External Secrets, GitHub Actions CI.',
    chips: ['Helm', 'ArgoCD'],
    href: 'https://github.com/AbadNaseer/k8s-gitops-argocd',
  },
  {
    name: 'terraform-gke-autopilot',
    blurb: 'GKE Autopilot with Workload Identity, VPC native, Cloud Armor WAF.',
    chips: ['Terraform', 'GCP'],
    href: 'https://github.com/AbadNaseer/terraform-gke-autopilot',
  },
  {
    name: 'terraform-azure-aks',
    blurb: 'Production AKS with Workload Identity, ACR, Key Vault, Container Insights.',
    chips: ['Terraform', 'Azure'],
    href: 'https://github.com/AbadNaseer/terraform-azure-aks',
  },
  {
    name: 'datadog-infra-monitoring',
    blurb: 'Datadog as code: APM, SLOs, burn rate alerts, PagerDuty routing.',
    chips: ['Datadog', 'Helm'],
    href: 'https://github.com/AbadNaseer/datadog-infra-monitoring',
  },
  {
    name: 'devsecops-pipeline',
    blurb: 'Security gates in CI: static analysis, dependency and image scanning.',
    chips: ['CI/CD', 'SonarQube'],
    href: 'https://github.com/AbadNaseer/devsecops-pipeline',
  },
  {
    name: 'aws-terraform-reference',
    blurb: 'Reusable AWS modules: VPC, ECS, RDS, ALB, IAM boundaries.',
    chips: ['Terraform', 'AWS'],
    href: 'https://github.com/AbadNaseer/aws-terraform-reference',
  },
];
