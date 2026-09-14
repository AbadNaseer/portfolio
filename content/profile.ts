export const profile = {
  name: 'Abad Naseer',
  role: 'Platform Engineer',
  location: 'Islamabad, Pakistan',
  siteUrl: 'https://abad.falcoflow.com',

  // The one sentence the whole site rests on.
  headline: {
    before: 'I build the infrastructure that serves ',
    accent: 'AI in production',
    after: ', and cut what it costs to run.',
  },
  headlinePlain:
    'I build the infrastructure that serves AI in production, and cut what it costs to run.',

  intro:
    'Models on GPU, retrieval and voice pipelines, and the Kubernetes and Terraform underneath all of it. I have taken a third off one AWS bill and sixty percent off another, and I write the Python that runs on what I build. Currently Platform Engineer at Ccript.',

  stack: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Python', 'FastAPI', 'Prometheus', 'RAG / LLM'],

  metrics: [
    { value: '30%', label: 'AWS spend removed', note: 'Autoscaling and ECS right-sizing, at 1M+ users' },
    { value: '787×', label: 'Faster catalog search', note: '6,456 ms to 8.2 ms on 25,631 products' },
    { value: '60%', label: 'Cheaper after migration', note: 'AWS to bare metal, zero customer downtime' },
    { value: '99.9%', label: 'Uptime sustained', note: '20K to 30K concurrent at peak load' },
  ],

  contactHeadline:
    'Have a platform that costs too much, breaks too often, or needs an AI layer that actually reaches production?',

  availability:
    'Open to contract and full-time work. I usually reply within a few hours.',

  links: {
    email: 'abad.naseerfast@gmail.com',
    linkedin: 'https://linkedin.com/in/abadnaseer',
    upwork: 'https://www.upwork.com/freelancers/~014f1d563a353a0012',
    resume: '/Abad_Naseer_Resume.pdf',
  },
} as const;
