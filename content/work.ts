export type ResultRow = {
  measure: string;
  before: string;
  after: string;
  change: string;
};

export type Agent = {
  name: string;
  blurb: string;
  chips: string[];
  href: string;
  hrefLabel: string;
};

export type Work = {
  slug: string;
  index: string;
  kicker: string;
  title: string;
  /** Shown on the landing card. One paragraph, no more. */
  summary: string;
  /** The single number the card is anchored by, with the conditions it was measured under. */
  metric: { value: string; note: string };
  tags: string[];
  stack: string[];
  shot?: { src: string; alt: string; chrome: string };
  featured?: boolean;

  // Case study page
  lede: string;
  meta: { label: string; value: string; href?: string }[];
  problem: { heading: string; paras: string[] };
  approach: { heading: string; paras: string[] };
  results?: { heading: string; rows: ResultRow[]; footnote?: string };
  agents?: { heading: string; blurb: string; items: Agent[] };
  diagram?: 'smartzees' | 'mediatiz' | 'firefly' | 'gitops' | 'nextlab';
  live?: { label: string; href: string };
  repo?: { label: string; href: string };
};

export const work: Work[] = [
  {
    slug: 'smartzees',
    index: '01',
    kicker: 'Conversational commerce',
    title: 'SmartZees',
    summary:
      'Three production AI assistants on one shared architecture. Retrieval over a vector store, with the backend owning all state, search and money math so the model only classifies intent and phrases the reply.',
    metric: { value: '787×', note: 'faster search, measured on a 25,631 product catalog' },
    tags: ['SmartMarket', 'SmartService', 'SmartCommunity'],
    stack: ['FastAPI', 'MySQL', 'pgvector', 'Gemini', 'Next.js', 'AWS'],
    shot: {
      src: '/img/work/smartmarket.webp',
      alt: 'SmartMarket answering a grocery request with ranked product results',
      chrome: 'marketz.smartzees.com/chat',
    },
    featured: true,
    live: { label: 'smartzees.com', href: 'https://smartzees.com' },

    lede:
      'SmartZees is a conversational commerce platform: you say what you need in plain language and it does the rest. Groceries, home services, community management. I built the backend, the retrieval layer and the infrastructure all three run on.',
    meta: [
      { label: 'Role', value: 'Backend, RAG and infrastructure' },
      { label: 'Timeline', value: '2026, ongoing' },
      { label: 'Agents shipped', value: 'Three, all in production' },
      { label: 'Live', value: 'smartzees.com', href: 'https://smartzees.com' },
    ],
    problem: {
      heading: 'A shop assistant who carries the whole warehouse to the counter, every single time',
      paras: [
        'Every message to the grocery agent re-read all 25,631 product rows and 206 MB of stored vectors out of MySQL, then threw them away. Replies took six to fifteen seconds. Against the production database it was twenty to twenty-three, and at one point the remote server simply dropped the connection mid-query under the weight of it.',
        'A conversation cannot survive that. If the assistant takes fifteen seconds to answer "do you have milk", nobody has a second conversation with it.',
      ],
    },
    agents: {
      heading: 'One platform, three fronts',
      blurb:
        'The three agents share a retrieval core, an intent layer and a deployment pattern. What differs is the domain, the data store and what "done" means for the user.',
      items: [
        {
          name: 'SmartMarket',
          blurb:
            'Order groceries by talking. Searches a 25,631 item catalog, keeps the cart, and speaks its replies out loud.',
          chips: ['MySQL', 'Voice STT/TTS'],
          href: 'https://marketz.smartzees.com/chat',
          hrefLabel: 'marketz.smartzees.com',
        },
        {
          name: 'SmartService',
          blurb:
            'Describe what has gone wrong and it finds the trade, shows the price, and books a real appointment slot.',
          chips: ['Postgres 18', 'pgvector'],
          href: 'https://servicez.smartzees.com',
          hrefLabel: 'servicez.smartzees.com',
        },
        {
          name: 'SmartCommunity',
          blurb:
            "Answers residents from their own community's documents only, issues parking passes, serves forms on request.",
          chips: ['Scoped RAG', 'QR passes'],
          href: 'https://livz.smartzees.com',
          hrefLabel: 'livz.smartzees.com',
        },
      ],
    },
    diagram: 'smartzees',
    approach: {
      heading: 'Learn the catalog once in the morning',
      paras: [
        'I replaced the per-query database read with an index built once at startup: the vectors stream into a pre-allocated float32 matrix, the metadata rides alongside as interned strings to keep the memory flat, and a rebuild swaps in atomically under a lock so no request ever sees a half-built index.',
        'The build runs on a background thread, so the health endpoint keeps answering in a fraction of a second while a restart is still warming up. The original database path stayed in the codebase behind a single environment flag, which made it both the instant revert and the honest "before" arm of the benchmark.',
        'One detail made bit-identical results possible: every stored vector was already L2 normalised, so the existing dot product was true cosine similarity. I sampled four hundred of them to confirm it rather than assume it.',
      ],
    },
    results: {
      heading: 'Measured, on 25,631 products',
      rows: [
        { measure: 'Catalog search, dev', before: '6,456 ms', after: '8.2 ms', change: '787×' },
        { measure: 'Search on the live database', before: '20.1 to 23.4 s', after: '7 to 110 ms', change: '196× to 3,339×' },
        { measure: 'Database rows read per message', before: '25,701', after: '2', change: '12,850×' },
        { measure: 'Result parity against the old path', before: 'baseline', after: '10 of 10 identical', change: 'no drift' },
      ],
      footnote:
        "Voice moved from the browser's speech API to server side speech recognition and synthesis in the same milestone, which took the product out of Chrome only and gave the assistant one consistent voice. A small cache on repeated phrases cut a repeated voice turn from 10.0 to 6.9 seconds.",
    },
  },

  {
    slug: 'nextlab',
    index: '02',
    kicker: 'Multi-tenant SaaS',
    title: 'NextLab',
    summary:
      'A pathology lab management platform running as a commercial product: patient intake, test templates, branded PDF reports, billing, commissions and analytics, sold on five subscription tiers to labs across Pakistan.',
    metric: { value: '1000+', note: 'active users across paying laboratories' },
    tags: ['nextlab.com.pk', 'Live product'],
    stack: ['Django REST', 'Next.js 14', 'PostgreSQL', 'Docker', 'Celery', 'Redis'],
    shot: {
      src: '/img/work/nextlab.webp',
      alt: 'NextLab laboratory management platform landing page',
      chrome: 'nextlab.com.pk',
    },
    live: { label: 'nextlab.com.pk', href: 'https://nextlab.com.pk' },

    lede:
      'NextLab is a multi-tenant laboratory information system: a lab signs up, gets its own subdomain and branding, and runs its entire operation through it. Patient registration, test results, report generation, payments, staff permissions and analytics. It is a real product with real paying customers, not a demo.',
    meta: [
      { label: 'Role', value: 'Full stack and infrastructure' },
      { label: 'Scale', value: '1000+ active users' },
      { label: 'Model', value: 'Five subscription tiers' },
      { label: 'Live', value: 'nextlab.com.pk', href: 'https://nextlab.com.pk' },
    ],
    problem: {
      heading: 'Four kinds of user, one database, and none of them may see each other',
      paras: [
        'A lab is not one user. There is the lab administrator who owns the account, the employees who register patients and enter results, the collection centres that take samples off site under the lab’s name, and the platform administrator above all of them. Each sees a different slice of the same data, and a leak between two labs would be a leak of patient records.',
        'On top of that, every lab wants its own test templates, its own report layout, its own pricing and its own commission rules. Building that as configuration rather than as forks was the whole design problem.',
      ],
    },
    diagram: 'nextlab',
    approach: {
      heading: 'Scoping enforced in one place, features layered on top',
      paras: [
        'Each actor type authenticates through its own token header and resolves to the same lab through a single permission layer, so scoping is decided once instead of being re-implemented in every view. Employees gate on a permissions object, collection centres on a separate feature-permission object, and subscription tier gates the advanced features. Tenancy itself is resolved from the subdomain in middleware.',
        'Test templates are global and read only to labs, which then adjust them through override layers rather than copies, so a platform-wide correction reaches every lab that has not deliberately overridden it.',
        'On that base I built the commercial layer the labs actually asked for: partner-lab panels with billing and settlement statements, marketing manager commissions with an automatic ledger, per-employee commission on the receipts they create, discount authorisation with per-test and per-day ceilings and a full audit trail, and receipt limits as rolling thirty day quotas that reset themselves.',
        'It runs as a Docker Compose stack on EC2 behind nginx, with Celery and Redis for subscription reminders, nightly database and media backups, and login throttling.',
      ],
    },
    results: {
      heading: 'What it does in production',
      rows: [
        { measure: 'Actor types, one permission layer', before: 'n/a', after: '4', change: 'admin, staff, centre, platform' },
        { measure: 'Subscription tiers sold', before: 'n/a', after: '5', change: 'trial through lifetime' },
        { measure: 'Active users', before: 'n/a', after: '1000+', change: 'paying laboratories' },
        { measure: 'Backups', before: 'none', after: 'nightly, DB and media', change: 'offsite copy' },
      ],
    },
  },

  {
    slug: 'mediatiz',
    index: '03',
    kicker: 'Cloud cost · reliability',
    title: 'Mediatiz Foundation',
    summary:
      'Ran the AWS estate behind an LMS and mobile app serving over a million users at 20K to 30K concurrent requests, then took a third of the bill out of it without touching uptime.',
    metric: { value: '30%', note: 'of AWS spend removed, at 99.9% uptime' },
    tags: ['mediatiz.org', 'Local LLM tutor'],
    stack: ['ECS', 'RDS', 'CloudWatch', 'Lambda', 'GitHub Actions', 'Ollama'],
    live: { label: 'mediatiz.org', href: 'https://mediatiz.org' },

    lede:
      'Mediatiz runs a media literacy programme at national scale: a learning platform and an Android app used by hundreds of thousands of students and teachers. I owned the AWS infrastructure underneath it, the release pipelines that shipped to it, and the reporting that ran on top.',
    meta: [
      { label: 'Role', value: 'DevOps Engineer' },
      { label: 'Timeline', value: 'Oct 2025 to Apr 2026' },
      { label: 'Scale', value: '1M+ users, 20K to 30K concurrent' },
      { label: 'Live', value: 'mediatiz.org', href: 'https://mediatiz.org' },
    ],
    problem: {
      heading: 'A bill sized for the peak, paid at every hour of the day',
      paras: [
        'The platform had to survive classroom-hour spikes of twenty to thirty thousand concurrent requests, so everything had been provisioned for the spike and left there. Outside those hours the same capacity sat idle and still billed.',
        'Separately, an AI tutor feature was planned on a third party LLM API. That meant a per-token bill that scaled with student numbers, and student questions leaving the country, which the programme could not accept.',
      ],
    },
    diagram: 'mediatiz',
    approach: {
      heading: 'Follow the actual load, and bring the model in house',
      paras: [
        'I put the scaling decisions on real signals: CloudWatch driven auto-scaling, ECS task definitions tuned to what the containers actually used rather than what had been guessed, and workload-aware right-sizing across staging and production. Thirty percent of the bill came off, and uptime stayed at 99.9%.',
        'For the tutor I built PyBot instead: Django in front of Ollama running Gemma 2B on self-hosted infrastructure. No external API bill, and student data never leaves the estate.',
        'I also built the release pipelines for four codebases at once, an Android app, a Laravel LMS, a Django service and a Next.js admin dashboard, with zero-downtime ECS rollouts, Slack deploy alerts and Play Console automation. Cross-departmental reporting moved onto a serverless Lambda, API Gateway, EventBridge and S3 path that replaced a manual workflow for eight departments.',
        'And I ran the security testing in house against staging, brute force, SQL injection and CSRF, with SQLMap and SonarQube, then handed the development team a remediation report they adopted.',
      ],
    },
    results: {
      heading: 'Measured over the engagement',
      rows: [
        { measure: 'AWS monthly spend', before: 'baseline', after: '30% lower', change: 'same workload' },
        { measure: 'Uptime at peak load', before: 'n/a', after: '99.9%', change: 'sustained' },
        { measure: 'External LLM API cost', before: 'per token', after: 'zero', change: 'self hosted Gemma 2B' },
        { measure: 'Departments on manual reporting', before: '8', after: '0', change: 'serverless pipeline' },
      ],
    },
  },

  {
    slug: 'firefly-migration',
    index: '04',
    kicker: 'Migration',
    title: 'Firefly.online, off the cloud',
    summary:
      'Moved an IoT SaaS platform off AWS onto self managed bare metal with a blue green cutover. PostgreSQL, Redis persistence and object storage all migrated while customers stayed online.',
    metric: { value: '~60%', note: 'lower infrastructure spend afterwards' },
    tags: ['Zero downtime', 'Blue / green'],
    stack: ['PostgreSQL', 'Redis', 'Nginx', 'Grafana', 'Prometheus', 'Spring Boot'],

    lede:
      'Firefly.online is an IoT SaaS platform built on Node.js, React and PostgreSQL. It ran entirely on AWS managed services. I led the move to self-managed bare metal, end to end, without taking the product offline.',
    meta: [
      { label: 'Role', value: 'DevOps Engineer, migration lead' },
      { label: 'Timeline', value: 'Dec 2023 to Oct 2025' },
      { label: 'Downtime', value: 'None, customer facing' },
      { label: 'Outcome', value: '~60% lower spend' },
    ],
    problem: {
      heading: 'Every managed service was a line item and a dependency',
      paras: [
        'EC2, ECS, RDS, ALB, S3, CloudFront, Lambda and Redis. Convenient, and expensive at the platform’s size, with limited control over placement and tuning. The business wanted the spend down and the control back.',
        'The constraint was that customers were live on it. A migration that needed a maintenance window long enough to move a production PostgreSQL database and its object storage was not acceptable.',
      ],
    },
    diagram: 'firefly',
    approach: {
      heading: 'Stand the new one up, prove it, then move the traffic',
      paras: [
        'Every managed service got a self-hosted equivalent provisioned and running in parallel: PostgreSQL for RDS, nginx for the load balancer, self-hosted object storage for S3, Redis on our own hardware. The new stack ran alongside the old one until it was demonstrably correct.',
        'The cutover was blue green: data migrated with replication catching up to the live database, then traffic switched. PostgreSQL, Redis persistence and object storage all moved with no customer-facing downtime, and infrastructure spend fell by roughly sixty percent.',
        'The platform was simultaneously moving from Node.js to Java Spring Boot, so I designed and provisioned the development, staging and production environments for the new stack: Ubuntu hosts with Java, Maven, Docker, PostgreSQL, Redis, Apache Kafka and nginx upstream load balancing across multiple backend instances.',
        'Then I made it observable and hardened it: Grafana, Prometheus, Loki and Node Exporter for metrics, centralised logging and alerting, with Let’s Encrypt, UFW, Fail2ban and SSH key restrictions across every environment. GitHub Actions and SonarQube handled code quality gates, image builds and per-environment deploys.',
      ],
    },
    results: {
      heading: 'What the move produced',
      rows: [
        { measure: 'Infrastructure spend', before: 'baseline', after: '~60% lower', change: 'same platform' },
        { measure: 'Customer facing downtime', before: 'n/a', after: 'zero', change: 'blue green cutover' },
        { measure: 'AWS managed services replaced', before: '8', after: '0', change: 'all self hosted' },
        { measure: 'Environments rebuilt', before: 'ad hoc', after: '3', change: 'dev, staging, prod' },
      ],
    },
  },

  {
    slug: 'k8s-gitops',
    index: '05',
    kicker: 'Kubernetes · GitOps',
    title: 'GitOps platform',
    summary:
      'ArgoCD App of Apps over Helm charts with per environment values, drift detection every three minutes and self healing. CI tags each image by commit SHA and writes the override back, so services roll independently.',
    metric: { value: '10', note: 'services across three environments, fully declarative' },
    tags: ['Open source', 'Polyglot, 4 languages'],
    stack: ['Kubernetes', 'ArgoCD', 'Helm', 'Terraform', 'Prometheus', 'External Secrets'],
    repo: { label: 'AbadNaseer/k8s-gitops-argocd', href: 'https://github.com/AbadNaseer/k8s-gitops-argocd' },

    lede:
      'A production-shaped GitOps platform, built in the open. Ten polyglot microservices across three environments, with Git as the only source of truth and ArgoCD reconciling the cluster back to it.',
    meta: [
      { label: 'Role', value: 'Architecture and build' },
      { label: 'Services', value: '10, in Go, Java, Node.js and Python' },
      { label: 'Environments', value: 'dev, staging, prod' },
      { label: 'Source', value: 'github.com/AbadNaseer', href: 'https://github.com/AbadNaseer/k8s-gitops-argocd' },
    ],
    problem: {
      heading: 'A cluster nobody can describe is a cluster nobody can rebuild',
      paras: [
        'Clusters drift. Someone patches a deployment by hand at two in the morning, it works, and now the running state and the repository disagree with no record of which is right. Multiply that across three environments and ten services and rebuilding becomes archaeology.',
        'The second problem is release coupling. When one pipeline deploys everything, a change to one service waits on every other service being ready.',
      ],
    },
    diagram: 'gitops',
    approach: {
      heading: 'Git decides, ArgoCD enforces, CI never touches the cluster',
      paras: [
        'A root ArgoCD application owns child applications, App of Apps, so the whole platform is one object to install and one place to look. Each service is a Helm chart with per environment values, and ArgoCD checks for drift every three minutes with auto-sync and self healing, so a hand patch is reverted rather than silently kept.',
        'CI never deploys. GitHub Actions builds each service, tags the image with the commit SHA, pushes it, and commits the per-service tag override back into the GitOps repository. ArgoCD picks that up and rolls that one service, which is what decouples the releases.',
        'Around that: HPA on CPU and custom metrics, External Secrets Operator pulling from AWS Secrets Manager so no secret lives in Git, nginx ingress with cert-manager and NetworkPolicies, and RBAC at both the Kubernetes and ArgoCD layers. Terraform provisions the EKS side.',
        'Observability is part of the platform, not bolted on: kube-prometheus-stack delivered through ArgoCD as a multi-source application and tuned for an 8 GB node, ServiceMonitors per service, and the cart and payment services instrumented with prom-client counters and gauges, verified end to end in Grafana through PromQL.',
        'Two fixes worth keeping: the upstream Dockerfiles referenced an openjdk:8-jdk base that had been deleted, which I replaced with a maven:3.8-eclipse-temurin-8 multi-stage build on amazoncorretto:8, and the Go dispatch service needed Go 1.22 or later to clear a pprof dependency break.',
      ],
    },
    results: {
      heading: 'What the platform guarantees',
      rows: [
        { measure: 'Drift detection interval', before: 'manual', after: '3 minutes', change: 'auto-sync, self heal' },
        { measure: 'Services deployable independently', before: '0 of 10', after: '10 of 10', change: 'per-service SHA tags' },
        { measure: 'Secrets stored in Git', before: 'some', after: 'none', change: 'External Secrets Operator' },
        { measure: 'Environments from one manifest set', before: 'n/a', after: '3', change: 'Helm values per env' },
      ],
    },
  },
];

export const getWork = (slug: string) => work.find((w) => w.slug === slug);
