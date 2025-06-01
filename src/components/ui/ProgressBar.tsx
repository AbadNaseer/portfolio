import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  label, 
  percentage, 
  color = 'from-primary-500 to-secondary-500' 
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${percentage}%`,
        transition: { duration: 1, ease: 'easeOut' }
      });
      
      // Animate the percentage counter
      let startValue = 0;
      const duration = 1000;
      const interval = 10;
      const steps = duration / interval;
      const increment = percentage / steps;
      
      const timer = setInterval(() => {
        startValue += increment;
        if (startValue > percentage) {
          startValue = percentage;
          clearInterval(timer);
        }
        setValue(Math.floor(startValue));
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [inView, percentage, controls]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{label}</span>
        <span className="text-primary-400">{value}%</span>
      </div>
      <div className="h-2.5 bg-dark-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: '0%' }}
          animate={controls}
        />
      </div>
    </div>
  );
};

export default ProgressBar;