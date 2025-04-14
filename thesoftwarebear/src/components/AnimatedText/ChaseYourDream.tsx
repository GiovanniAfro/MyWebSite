'use client';

import { motion } from 'framer-motion';

export default function ChaseYourDream() {
  // Varianti per l'animazione del testo
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateZ: Math.random() * 10 - 5 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateZ: 0,
      transition: { 
        type: "spring", 
        damping: 12,
        stiffness: 100
      } 
    }
  };
  
  const text = "Chase Your Dream";
  
  return (
    <motion.div 
      className="w-full overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={textVariants}
    >
      <div className="flex justify-center">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block text-6xl md:text-8xl font-bold text-[#FFC107] font-street"
            style={{ 
              textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
              filter: 'drop-shadow(0 0 8px rgba(255, 193, 7, 0.3))'
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}