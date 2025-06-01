import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface MetricCardProps {
  value: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  suffix = '',
  icon,
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000; // ms
      const increment = value / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start > value) {
          start = value;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, 16);

      return () => {
        clearInterval(timer);
      };
    }
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="card flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 bg-primary-900/30 rounded-full flex items-center justify-center mb-4 text-primary-400">
        {icon}
      </div>
      <h3 className="text-3xl font-bold gradient-text mb-2">
        {count}{suffix}
      </h3>
      <p className="text-slate-400">{label}</p>
    </motion.div>
  );
};

export default MetricCard;