import React from 'react';
import { motion } from 'framer-motion';

interface FloatingHeartsProps {
  count?: number;
  intensity?: 'light' | 'heavy';
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 15, intensity = 'light' }) => {
  const hearts = Array.from({ length: count });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className={`absolute text-soft-pink/30 ${intensity === 'heavy' ? 'text-red-400/50' : ''}`}
          initial={{ 
            y: "100vh", 
            x: Math.random() * 100 + "vw", 
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0 
          }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.8, 0],
            rotate: Math.random() * 360 
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            fontSize: `${Math.random() * 2 + 1}rem`
          }}
        >
          {Math.random() > 0.5 ? '❤️' : '💖'}
        </motion.div>
      ))}
    </div>
  );
};