
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Copy } from 'lucide-react';

interface GamePageProps {
  onBack: () => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// 8 Pairs for 4x4 Grid (16 Cards total)
const GAME_EMOJIS = ['💘', '🌹', '🎁', '💍', '🧸', '🎀', '✨', '👑'];

export const GamePage: React.FC<GamePageProps> = ({ onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const SECRET_CODE = '1234';

  const initializeGame = () => {
    const pairs = [...GAME_EMOJIS, ...GAME_EMOJIS];
    const shuffled = pairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedIndices([]);
    setIsGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Sound effect for matching cards
  const playMatchSound = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5 (High pitch)
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1); // Slide up to A6

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  };

  const handleCardClick = (index: number) => {
    if (
      cards[index].isFlipped || 
      cards[index].isMatched || 
      flippedIndices.length >= 2
    ) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        // Match found
        playMatchSound(); // Play sound
        
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          
          if (matchedCards.every(c => c.isMatched)) {
            setIsGameWon(true);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 relative z-20 overflow-y-auto">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 left-4 md:left-10 z-30"
        >
            <button 
                onClick={onBack}
                className="bg-white/40 backdrop-blur-md hover:bg-white/60 text-deep-pink p-3 rounded-full transition-all shadow-lg border border-white/60"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
        </motion.div>

        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/20 backdrop-blur-xl border border-white/40 p-6 md:p-8 rounded-[2rem] shadow-2xl max-w-lg w-full mt-8 mb-8"
        >
            <div className="text-center mb-6">
                <h2 className="font-playfair text-2xl md:text-3xl text-deep-pink font-bold drop-shadow-sm">
                    {isGameWon ? '🎉 You Won! 🎉' : 'Match the Hearts'}
                </h2>
                <p className="font-poppins text-sm text-gray-700 mt-2">
                    {isGameWon ? 'Here is your secret code:' : 'Find all pairs to reveal the code'}
                </p>
            </div>

            {!isGameWon ? (
                <div className="grid grid-cols-4 gap-3 md:gap-4 perspective-[1000px]">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            className={`aspect-square cursor-pointer relative transition-opacity duration-700 ${card.isMatched ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                            whileHover={!card.isMatched ? { scale: 1.05 } : {}}
                            onClick={() => handleCardClick(index)}
                            whileTap={!card.isMatched ? { scale: 0.95 } : {}}
                        >
                            {/* Front (Closed State - New Color, No Question Mark) */}
                            <div 
                                className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-300/80 to-purple-300/80 backdrop-blur-md border-2 border-white/60 rounded-xl shadow-lg hover:brightness-110 transition-all"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                            </div>
                            
                            {/* Back (Emoji - Pure White) */}
                            <div 
                                className="absolute inset-0 w-full h-full bg-white backdrop-blur-xl border-2 border-pink-300 rounded-xl flex items-center justify-center shadow-xl"
                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                            >
                                <span className="text-2xl md:text-3xl">{card.emoji}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-8 text-center"
                >
                    <div className="text-4xl font-bold text-deep-pink tracking-[0.5em] font-mono bg-white p-4 rounded-xl border border-pink-200 shadow-inner mb-6">
                        {SECRET_CODE}
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                        className="w-full bg-deep-pink text-white py-4 rounded-full font-bold shadow-lg hover:shadow-pink-500/30 transition-all text-lg flex items-center justify-center gap-2"
                    >
                        <Copy className="w-5 h-5" /> Go Unlock Now
                    </motion.button>
                </motion.div>
            )}

            {!isGameWon && (
                <motion.button 
                    whileHover={{ scale: 1.02, color: "#FF1493" }}
                    onClick={initializeGame}
                    className="w-full flex items-center justify-center gap-2 text-gray-600 text-sm transition-colors py-4 mt-2 font-poppins hover:bg-white/30 rounded-xl"
                >
                    <RefreshCw className="w-4 h-4" /> Restart Game
                </motion.button>
            )}
        </motion.div>
    </div>
  );
};
