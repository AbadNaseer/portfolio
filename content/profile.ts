export const profile = {
  name: 'Abad Naseer',
  role: 'Platform Engineer',
  location: 'Islamabad, Pakistan',
  siteUrl: 'https://abad.falcoflow.com',

  // The one sentence the whole site rests on.
  headline: {
    before: 'I build the infrastructure behind cloud platforms, and the ',
    accent: 'AI products',
    after: ' that run on top of it.',
  },
  headlinePlain:
    'I build the infrastructure behind cloud platforms, and the AI products that run on top of it.',

  intro:
    'Most people do one or the other. I do both: the AWS and Kubernetes underneath, and the retrieval systems, voice pipelines and APIs on top. Currently Platform Engineer at Ccript, on GCP and observability.',

  stack: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'ArgoCD', 'Prometheus', 'FastAPI', 'RAG / LLM'],

  metrics: [
    { value: '30%', label: 'AWS spend removed', note: 'Autoscaling and ECS right-sizing, at 1M+ users' },
    { value: '787×', label: 'Faster catalog search', note: '6,456 ms to 8.2 ms on 25,631 products' },
    { value: '60%', label: 'Cheaper after migration', note: 'AWS to bare metal, zero customer downtime' },
    { value: '99.9%', label: 'Uptime sustained', note: '20K to 30K concurrent at peak load' },
  ],

  contactHeadline:
    'Have infrastructure that needs building, or a product that needs to reach production?',

  links: {
    email: 'abad.naseerfast@gmail.com',
    github: 'https://github.com/AbadNaseer',
    linkedin: 'https://linkedin.com/in/abadnaseer',
    // Left empty deliberately: I do not have your real Upwork profile URL and will
    // not guess one. Paste it here and it appears in the nav, contact block and footer.
    upwork: '',
    resume: '/Abad_Naseer_Resume.pdf',
  },
} as const;
