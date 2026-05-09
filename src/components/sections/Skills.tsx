import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import ProgressBar from '../ui/ProgressBar';
import TerminalEffect from '../ui/TerminalEffect';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const technicalSkills = [
    { label: 'AWS (ECS/EKS, Lambda, CloudWatch, RDS, CloudFront, WAF)', percentage: 92 },
    { label: 'Kubernetes — EKS · AKS · GKE (Helm, ArgoCD, GitOps, HPA, RBAC)', percentage: 90 },
    { label: 'CI/CD — GitHub Actions · Jenkins · Zero-Downtime Deployments', percentage: 92 },
    { label: 'IaC — Terraform · Ansible (AWS · Azure · GCP)', percentage: 87 },
    { label: 'Observability — Prometheus · Grafana · Datadog · EFK · Jaeger · eBPF', percentage: 90 },
    { label: 'DevSecOps — Vault · WAF · OWASP Testing · Kali Linux · SonarQube', percentage: 83 },
  ];

  const tools = [
    { label: 'AI / MLOps — MLflow · Airflow · DVC · Ollama · RAG · LangChain', percentage: 85 },
    { label: 'Cloud Platforms — AWS · Azure (AKS) · GCP (GKE · Cloud Run)', percentage: 84 },
    { label: 'Nginx · Blue-Green · Canary · GitOps Deployments', percentage: 90 },
    { label: 'OpenTelemetry · Jaeger · eBPF (groundcover) · Distributed Tracing', percentage: 79 },
    { label: 'HashiCorp Vault · SSL/TLS · fail2ban · UFW/iptables', percentage: 85 },
    { label: 'Python · Bash · TypeScript · Kotlin · Java/Spring Boot', percentage: 85 },
  ];

  const terminalCommands = [
    'kubectl apply -f argocd/app-of-apps.yaml',
    'helm upgrade --install api ./charts/api-service -f values-prod.yaml',
    'terraform apply -var-file=environments/prod.tfvars',
    'aws ecs update-service --force-new-deployment --cluster prod',
    'datadog-ci synthetics run-tests --public-id abc-123'
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <SectionTitle 
          title="Technical Skills"
          subtitle="Full-stack DevOps — cloud, containers, GitOps, observability, security, and AI/MLOps."
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
                <ProgressBar key={index} label={skill.label} percentage={skill.percentage} delay={index * 0.1} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6 gradient-text">Tools &amp; Technologies</h3>
              {tools.map((tool, index) => (
                <ProgressBar key={index} label={tool.label} percentage={tool.percentage} color="from-secondary-500 to-primary-500" delay={index * 0.1} />
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
                  {[
                    'AWS Production Ops at 1M+ User Scale (99.9% Uptime)',
                    'Cloud Cost Engineering — 30% AWS Reduction',
                    'GitOps with ArgoCD — Drift Detection, Auto-Sync, Rollback',
                    'Helm Chart Authoring — Multi-Environment Values, HPA, Ingress',
                    'Multi-Cloud Kubernetes — EKS · AKS (Azure) · GKE (GCP)',
                    'Datadog APM + SLOs + PagerDuty Burn-Rate Alerting',
                    'Blue-Green & Zero-Downtime Deployments',
                    'In-House Offensive Security (OWASP, Kali, SQLMap, WAF Tuning)',
                    'AI Products End-to-End (Ollama, MLflow, Airflow, RAG, FAISS)',
                    'Real-Time Systems (SCHED_FIFO, CPU Affinity, mlockall)',
                  ].map(item => (
                    <li key={item} className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
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
