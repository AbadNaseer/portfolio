import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineItemProps {
  position: string;
  company: string;
  period: string;
  description: string[];
  isLast?: boolean;
  delay?: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  position,
  company,
  period,
  description,
  isLast = false,
  delay = 0,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="relative pl-8 pb-8"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute top-0 left-3 w-0.5 h-full bg-slate-800"></div>
      )}
      
      {/* Timeline dot */}
      <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white"></div>
      </div>
      
      <div className="card">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold">{position}</h3>
            <p className="text-primary-400 font-medium">{company}</p>
          </div>
          <span className="text-slate-400 font-mono text-sm whitespace-nowrap">
            {period}
          </span>
        </div>
        
        <ul className="text-slate-300 space-y-2">
          {description.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default TimelineItem;