
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Heart, Gift, Eye, EyeOff } from 'lucide-react';

interface PasswordPageProps {
  onUnlock: () => void;
  onPlayGame: () => void;
}

export const PasswordPage: React.FC<PasswordPageProps> = ({ onUnlock, onPlayGame }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const validCodes = ['maharani', 'love', '1234', 'birthday'];
  
  const isValid = validCodes.includes(code.toLowerCase().trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-white/30 backdrop-blur-xl p-5 md:p-8 rounded-3xl shadow-2xl border border-white/50 max-w-xs md:max-w-md w-full text-center"
      >
        <div className="mb-5 flex justify-center">
           <motion.div 
             animate={{ rotate: [0, 10, -10, 0] }}
             transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
             className="bg-white/50 p-3 md:p-4 rounded-full shadow-lg"
           >
             <Lock className="w-8 h-8 md:w-10 md:h-10 text-deep-pink" />
           </motion.div>
        </div>
        
        <h1 className="font-playfair text-3xl md:text-4xl text-gray-800 mb-2">Hello Maharani!</h1>
        <p className="font-poppins text-sm md:text-base text-gray-700 mb-5">Enter the secret code to unlock your surprise.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <motion.div animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}>
            <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Secret Code..."
                  className="w-full px-5 py-3 pr-12 rounded-full border-2 border-deep-pink/30 bg-white/90 focus:bg-white focus:border-deep-pink outline-none text-center text-lg transition-all font-poppins shadow-inner hover:bg-white text-deep-pink placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-deep-pink transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
          </motion.div>
          
          {error && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-red-500 font-poppins text-xs md:text-sm bg-white/50 rounded-full py-1 mt-1">Incorrect! Play the game below to get the code! 👇</motion.p>}

          <motion.button 
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 20, 147, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            animate={isValid ? { 
                y: [0, -4, 0],
                boxShadow: ["0 4px 6px -1px rgba(0, 0, 0, 0.1)", "0 10px 15px -3px rgba(255, 20, 147, 0.4)", "0 4px 6px -1px rgba(0, 0, 0, 0.1)"]
            } : {}}
            transition={{ 
                duration: 0.8, 
                repeat: isValid ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut"
            }}
            className={`bg-gradient-to-r from-deep-pink to-purple-500 text-white font-bold py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all text-lg ${isValid ? 'brightness-110' : ''}`}
          >
            Unlock Surprise <Heart className={`w-5 h-5 fill-current ${isValid ? 'animate-pulse' : ''}`} />
          </motion.button>
        </form>

        <motion.button 
          onClick={onPlayGame}
          whileHover={{ scale: 1.05, color: "#FF1493" }}
          className="mt-6 text-gray-600 text-xs md:text-sm underline transition-colors font-poppins flex items-center justify-center gap-1 mx-auto hover:text-deep-pink"
        >
          <Gift className="w-4 h-4" /> Code nahi pata? Game khelo!
        </motion.button>
      </motion.div>
    </div>
  );
};
