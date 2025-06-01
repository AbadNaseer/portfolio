import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TerminalEffectProps {
  commands: string[];
  loop?: boolean;
  className?: string;
}

const TerminalEffect: React.FC<TerminalEffectProps> = ({ 
  commands, 
  loop = true,
  className = '' 
}) => {
  const [typingSequence, setTypingSequence] = useState<any[]>([]);

  useEffect(() => {
    const sequence: any[] = [];
    
    commands.forEach((command, index) => {
      // Add the command
      sequence.push(command);
      
      // Add a delay after each command except the last one when not looping
      if (index < commands.length - 1 || loop) {
        sequence.push(1500);
      }
    });
    
    setTypingSequence(sequence);
  }, [commands, loop]);

  if (typingSequence.length === 0) {
    return null;
  }

  return (
    <div className={`terminal ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-error-500"></div>
        <div className="w-3 h-3 rounded-full bg-warning-500"></div>
        <div className="w-3 h-3 rounded-full bg-success-500"></div>
        <span className="text-xs text-slate-500 ml-2">terminal</span>
      </div>
      <div className="font-mono text-sm sm:text-base">
        <span className="text-secondary-500">$ </span>
        <TypeAnimation
          sequence={typingSequence}
          wrapper="span"
          cursor={true}
          repeat={loop ? Infinity : 0}
          style={{ 
            display: 'inline-block',
            color: '#e2e8f0' // text-slate-200
          }}
        />
      </div>
    </div>
  );
};

export default TerminalEffect;