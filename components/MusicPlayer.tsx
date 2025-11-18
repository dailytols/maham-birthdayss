
import React, { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

// Simple oscillator synth to avoid external audio files dependency
export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false); // Ref to track state inside timeout loops

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopMusic();
    };
  }, []);

  const playNote = (freq: number, duration: number, time: number) => {
    if (!audioContextRef.current) return;
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0.1, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.1);
    
    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    osc.start(time);
    osc.stop(time + duration);
  };

  const playMelody = () => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }

    const now = audioContextRef.current.currentTime;
    // Happy Birthday Melody (simplified)
    // G4, G4, A4, G4, C5, B4
    const notes = [
      { f: 392, d: 0.5 }, { f: 392, d: 0.5 }, { f: 440, d: 1 }, { f: 392, d: 1 }, { f: 523, d: 1 }, { f: 493, d: 2 },
      // G4, G4, A4, G4, D5, C5
      { f: 392, d: 0.5 }, { f: 392, d: 0.5 }, { f: 440, d: 1 }, { f: 392, d: 1 }, { f: 587, d: 1 }, { f: 523, d: 2 }
    ];

    let currentTime = now;
    notes.forEach(note => {
        playNote(note.f, note.d * 0.5, currentTime);
        currentTime += note.d * 0.5;
    });
    
    // Loop
    setTimeout(() => {
        if (isPlayingRef.current) playMelody();
    }, 6000);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      playMelody();
    }
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-all duration-300 border-2 border-gold/50 text-deep-pink"
    >
      {isPlaying ? <Music className="w-6 h-6 animate-pulse" /> : <VolumeX className="w-6 h-6" />}
    </motion.button>
  );
};
