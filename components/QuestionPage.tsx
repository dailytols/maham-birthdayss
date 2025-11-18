
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Frown } from 'lucide-react';

interface QuestionPageProps {
  onNext: () => void;
}

export const QuestionPage: React.FC<QuestionPageProps> = ({ onNext }) => {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  const handleYes = () => {
    setAnswer('yes');
  };

  const handleNo = () => {
    setAnswer('no');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-white max-w-xl w-full"
      >
        <h2 className="font-playfair text-3xl md:text-5xl text-gray-800 mb-8 leading-tight">
            Best Friends Forever,<br/> 
            <span className="text-deep-pink font-dancing text-4xl md:text-6xl block mt-2">Maharani?</span>
        </h2>

        {!answer && (
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center mt-6">
                <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 20, 147, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    className="bg-deep-pink hover:bg-pink-600 text-white text-lg md:text-xl px-12 py-4 rounded-full shadow-lg flex items-center gap-2 font-bold w-full md:w-auto justify-center transition-colors"
                >
                    ALWAYS 💖
                </motion.button>

                <motion.button 
                    whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#e5e7eb",
                        color: "#374151",
                        boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNo}
                    className="bg-white/80 hover:bg-gray-200 text-gray-600 text-lg md:text-xl px-12 py-4 rounded-full shadow-lg font-bold w-full md:w-auto justify-center border border-gray-200 transition-colors flex items-center gap-2"
                >
                    NEVER 😢
                </motion.button>
            </div>
        )}

        {answer === 'yes' && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6"
            >
                <div className="text-green-600 font-bold text-xl md:text-2xl mb-2 flex items-center justify-center gap-2">
                    <Heart className="fill-current w-6 h-6 md:w-8 md:h-8 animate-bounce" /> YAYYY!
                </div>
                <p className="font-poppins text-gray-600 text-sm md:text-base mb-6">Besties for life! 👯‍♀️</p>
                <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 20, 147, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="bg-deep-pink text-white px-8 py-3 rounded-full font-bold animate-pulse shadow-lg shadow-pink-500/50 text-lg"
                >
                    See Next Surprise 🎁
                </motion.button>
            </motion.div>
        )}

        {answer === 'no' && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6"
            >
                <div className="text-gray-500 font-bold text-xl md:text-2xl mb-2 flex items-center justify-center gap-2">
                    <Frown className="w-8 h-8 md:w-10 md:h-10" /> Ouch...
                </div>
                <p className="font-poppins text-gray-600 text-sm md:text-base mb-6">
                    My heart just broke into a million pieces... 💔<br/>
                    (I know you're joking though! 🥺)
                </p>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="bg-gray-400 hover:bg-deep-pink text-white px-8 py-3 rounded-full font-bold shadow-lg text-lg transition-colors"
                >
                    Just Kidding! Next 🎁
                </motion.button>
            </motion.div>
        )}
      </motion.div>
    </div>
  );
};
