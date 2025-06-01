import React from 'react';
import { Award, Clock, Users, TrendingDown } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import MetricCard from '../ui/MetricCard';

const Achievements: React.FC = () => {
  const metrics = [
    {
      icon: <Award size={24} />,
      value: 100,
      suffix: '%',
      label: 'CI/CD Pipeline Success Rate'
    },
    {
      icon: <TrendingDown size={24} />,
      value: 40,
      suffix: '%',
      label: 'Cost Reduction in Cloud Migrations'
    },
    {
      icon: <Clock size={24} />,
      value: 99.9,
      suffix: '%',
      label: 'Uptime SLA Maintenance'
    },
    {
      icon: <Users size={24} />,
      value: 10,
      suffix: 'K+',
      label: 'Users Served Across Production Systems'
    }
  ];

  return (
    <section id="achievements" className="section-padding bg-dark-400">
      <div className="container-custom">
        <SectionTitle 
          title="Key Achievements"
          subtitle="Measurable results and impact from my DevOps implementations."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              icon={metric.icon}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              delay={index}
            />
          ))}
        </div>
        
        <div className="mt-16 card">
          <h3 className="text-xl font-bold mb-6 gradient-text">Notable Accomplishments</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-primary-400">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Infrastructure Cost Optimization</h4>
                <p className="text-slate-400">
                  Implemented resource optimization strategies across AWS services, reducing monthly 
                  infrastructure costs by 40% while maintaining performance and reliability standards.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-primary-400">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">High-Performance MLOps Pipeline</h4>
                <p className="text-slate-400">
                  Designed and implemented an end-to-end MLOps pipeline that reduced model training 
                  and deployment time by 70%, enabling faster iteration cycles for data scientists.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-primary-400">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Zero-Downtime Deployment Strategy</h4>
                <p className="text-slate-400">
                  Architected and implemented a zero-downtime deployment strategy for critical 
                  production applications, achieving 99.9% uptime and eliminating service interruptions.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-primary-400">
                <span className="font-bold">4</span>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Security Compliance Automation</h4>
                <p className="text-slate-400">
                  Developed automated security scanning and compliance checking tools, reducing 
                  security audit preparation time by 60% and ensuring continuous compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;