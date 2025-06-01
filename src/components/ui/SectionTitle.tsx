import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  align = 'center' 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`mb-12 max-w-2xl ${alignmentClasses[align]}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title.split(' ').map((word, index) => (
          <span key={index}>
            {index === 0 ? <span className="gradient-text">{word}</span> : ` ${word}`}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-lg">{subtitle}</p>
      )}
      <div className={`h-1 w-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded mt-4 ${
        align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
      }`}></div>
    </motion.div>
  );
};

export default SectionTitle;