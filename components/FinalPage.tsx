
import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FloatingHearts } from './FloatingHearts';
import { Sparkles, RefreshCcw } from 'lucide-react';

// Confetti declaration
declare global {
  interface Window {
    confetti: any;
  }
}

interface FinalPageProps {
  onReplay: () => void;
}

export const FinalPage: React.FC<FinalPageProps> = ({ onReplay }) => {
  
  const fireConfetti = useCallback(() => {
    if (typeof window.confetti !== 'function') return;

    // First burst - Center
    window.confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF1493', '#FFD700', '#E6E6FA', '#FFB6C1']
    });

    // Side Cannons loop
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50, colors: ['#FF1493', '#FFD700', '#E6E6FA'] };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }, []);

  useEffect(() => {
    // Small delay to ensure layout is ready
    const timer = setTimeout(() => {
        fireConfetti();
    }, 500);
    return () => clearTimeout(timer);
  }, [fireConfetti]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Heavier hearts for finale */}
      <FloatingHearts count={30} intensity="heavy" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-deep-pink/20 to-transparent pointer-events-none"></div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1.2 }}
        className="bg-white/20 backdrop-blur-xl p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] border-2 md:border-4 border-gold shadow-[0_0_50px_rgba(255,215,0,0.3)] relative z-10 max-w-3xl mx-auto w-full"
      >
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
            <motion.h1 
                className="font-playfair text-4xl md:text-7xl text-gold mb-6 drop-shadow-lg leading-tight"
                animate={{ textShadow: ["0px 0px 0px #FFD700", "0px 0px 20px #FFD700", "0px 0px 0px #FFD700"] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                THE GRAND FINALE!
            </motion.h1>

            <div className="flex justify-center gap-4 text-4xl md:text-6xl mb-6 md:mb-8 animate-bounce">
                <span>👯‍♀️</span>
                <span>💖</span>
            </div>

            <p className="font-dancing text-2xl md:text-4xl text-white mb-8 leading-relaxed drop-shadow-md px-2">
                "In a world full of trends,<br/> 
                thank you for being a classic.<br/>
                Happy Birthday, Bestie!"
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
                <motion.button 
                    onClick={fireConfetti}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)" }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gold text-deep-pink font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 hover:bg-white transition-colors text-lg w-full md:w-auto justify-center"
                >
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6" /> Celebrate Again!
                </motion.button>

                <motion.button 
                    onClick={onReplay}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 border-2 border-white/50 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 hover:bg-white/30 transition-colors text-lg w-full md:w-auto justify-center"
                >
                    <RefreshCcw className="w-5 h-5 md:w-6 md:h-6" /> Replay Story
                </motion.button>
            </div>

            <div className="font-poppins text-white/80 text-xs md:text-sm mt-8 md:mt-12">
                Made with ❤️ by Your Best Friend
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
