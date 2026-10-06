export const profile = {
  name: 'Abad Naseer',
  role: 'Platform & Forward-Deployed Engineer',
  shortRole: 'Platform Engineer',
  location: 'Islamabad, PK',
  siteUrl: 'https://abad.falcoflow.com',

  /* The one sentence the whole document rests on. Set once, at the top, in
     serif at 400. Not split into an accent-coloured fragment: colouring one
     phrase of your own headline is the most copied hero device of the last
     five years and it reads as decoration, not emphasis. */
  headline: 'I build the infrastructure that serves AI in production, and cut what it costs to run.',
  headlinePlain:
    'I build the infrastructure that serves AI in production, and cut what it costs to run.',

  /* The standfirst. Reads as the abstract of a paper: what the work is, and
     the two numbers that make the claim checkable. */
  intro:
    'Models on GPU, the retrieval and voice pipelines around them, and the Kubernetes, OpenTofu and Ansible underneath all of it. I have taken a third off one AWS bill and sixty percent off another, and I write the Python that runs on what I build.',

  /* Four measurements, each quoted with the conditions it was taken under.
     Presented as a table rather than a card grid: a table is how you show
     measurements, a card grid is how you show features. */
  metrics: [
    { value: '30%', label: 'AWS spend removed', note: 'Autoscaling and ECS right-sizing, at 1M+ users' },
    { value: '787×', label: 'Faster catalog search', note: '6,456 ms to 8.2 ms on 25,631 products' },
    { value: '~60%', label: 'Cheaper after migration', note: 'AWS to bare metal, zero customer downtime' },
    { value: '99.9%', label: 'Uptime sustained', note: '20K to 30K concurrent at peak load' },
  ],

  /* Addressed to a hiring CTO and a founder in the same sentence. The old
     version was a three-part rhetorical question aimed only at a buyer. */
  contactHeadline:
    'If something you depend on costs too much, breaks too often, or needs an AI layer that actually reaches production, I would like to hear about it.',

  availability:
    'Open to contract and full-time work. I usually reply within a few hours.',

  links: {
    email: 'abad.naseerfast@gmail.com',
    linkedin: 'https://linkedin.com/in/abadnaseer',
    upwork: 'https://www.upwork.com/freelancers/~014f1d563a353a0012',
    resume: '/Abad_Naseer_Resume.pdf',
  },
} as const;
