
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface WelcomePageProps {
  onNext: () => void;
}

// Helper for celebration sound (Soft Blast)
const playCelebrationSound = () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  const ctx = new AudioContext();
  const now = ctx.currentTime;

  // 1. "Blast" Noise (Soft Puff/Pop)
  const bufferSize = ctx.sampleRate * 0.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Brown/Pink noise filter approximation
    const output = (lastOut + (0.02 * white)) / 1.02;
    lastOut = output;
    data[i] = output * 3.5; 
  }

  const noiseSrc = ctx.createBufferSource();
  noiseSrc.buffer = buffer;
  const noiseGain = ctx.createGain();
  
  // Lowpass filter to make it "soft"
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800;

  noiseSrc.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noiseGain.gain.setValueAtTime(0.3, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  noiseSrc.start(now);

  // 2. Magical Chime / Fanfare (Soft & Sparkly)
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C Major arpeggio
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine'; 
    osc.frequency.setValueAtTime(freq, now);
    
    // Fast stagger for a "strum" effect
    const t = now + (i * 0.06);
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.0);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + 2.5);
  });
};

export const WelcomePage: React.FC<WelcomePageProps> = ({ onNext }) => {
  const [showButton, setShowButton] = useState(false);
  const title = "Happy Birthday Maham!";
  const paragraph = "To my partner in crime and absolute best friend... Life is so much better with your crazy energy. Here's to another year of inside jokes, endless laughter, and making unforgettable memories together!";

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Fast typing speed
        delayChildren: 0.3,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  const handleAnimationComplete = () => {
    if (!showButton) {
        setShowButton(true);
        playCelebrationSound();
        
        if (typeof window.confetti === 'function') {
            // Conic Cylinder Blast effect
            const end = Date.now() + 2000; 
            
            const colors = ['#ff0000', '#ffffff', '#FFD700', '#FF1493'];

            (function frame() {
            window.confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            window.confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
            }());
        }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative z-10 max-w-4xl mx-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20 shadow-lg"
      >
        <motion.h1 
          className="font-great-vibes text-5xl sm:text-6xl md:text-8xl text-deep-pink mb-6 leading-tight drop-shadow-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((char, index) => (
            <motion.span key={index} variants={charVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          className="font-dancing text-xl sm:text-2xl md:text-3xl text-gray-700 mb-8 max-w-2xl leading-relaxed mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={handleAnimationComplete}
        >
          {paragraph.split("").map((char, index) => (
            <motion.span key={index} variants={charVariants}>
              {char}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center h-16"
        >
          {showButton && (
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 20, 147, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/90 text-deep-pink border-2 border-deep-pink px-6 py-3 md:px-8 md:py-4 rounded-full font-poppins font-semibold shadow-lg flex items-center gap-2 hover:bg-deep-pink hover:text-white transition-all duration-300 text-base md:text-lg group"
              >
                View Our Memories <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};