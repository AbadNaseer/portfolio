import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'MLOps Text Classification Pipeline',
      description: 'Built end-to-end MLOps pipeline with Airflow orchestration, tracking 4+ NLP models in MLflow with automated retraining and deployment via FastAPI.',
      techStack: ['Airflow', 'MLflow', 'FastAPI', 'Prometheus', 'Grafana', 'Docker'],
      year: '2024',
      githubUrl: 'https://github.com/AbadNaseer/mlops-text-classification'
    },
    {
      title: 'AlohaImages.co - Production Scale Platform',
      description: 'Deployed scalable platform serving 10K+ users with AWS multi-service architecture and Kubernetes orchestration with HPA, Redis caching, and Kafka.',
      techStack: ['Next.js', 'Spring Boot', 'AWS', 'Kubernetes', 'Redis', 'Kafka'],
      year: '2024',
      url: 'https://alohaimages.co'
    },
    {
      title: 'Enterprise Cloud Migration',
      description: 'Led AWS to multi-cloud migration reducing costs by 40% while maintaining 100% service availability and containerizing 20+ legacy applications.',
      techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Helm'],
      year: '2024'
    },
    {
      title: 'DevCheck Platform',
      description: 'Built full-stack application with automated CI/CD, SSL termination, and database clustering. Docker containerization and Nginx load balancing.',
      techStack: ['React', 'Spring Boot', 'PostgreSQL', 'Docker', 'Nginx', 'GitHub Actions'],
      year: '2024',
      url: 'https://www.devcheck.firefly.online/build'
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