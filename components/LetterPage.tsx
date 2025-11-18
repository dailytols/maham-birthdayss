
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

interface LetterPageProps {
  onNext: () => void;
}

export const LetterPage: React.FC<LetterPageProps> = ({ onNext }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const content = `Date: 20 November

Maham 🌸,
Kabhi socha nahi tha ki ek online milne wali friend meri life ki itni special dost ban jayegi 💖. Aaj tum meri life ki un friends mein ho jinke saath main bina kisi hesitation ke, fully comfort zone mein, kuch bhi share kar sakta hoon 😊. And again sorry haa mujhe yad hai apko sorry / thankyou nhi bolna hai but fr bhi agr meri kisi baat ka bura laga hai to maaf kar Dena ji ✨ .Tumhari baatein, tumhari positivity aur tumhari smile mujhe hamesha motivate karti hai ✨. 

On your special day 🎉, I just want to wish you endless happiness 🌈, success 💫 aur woh saari cheezein jo tum deserve karti ho 🌟. May all your dreams come true and you have lots of joy and magical memories 🦋.

Happy Birthday dear bestfriend friend, Maham! 🎂🎁💐

Always here for you ❤️,
Your Himanshu`;

  useEffect(() => {
    let i = 0;
    const speed = 40; // typing speed in ms
    const interval = setInterval(() => {
      if (i < content.length) {
        setDisplayedText(content.slice(0, i + 1));
        i++;
        // Auto-scroll to bottom as text types
        if (scrollRef.current) {
           scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setShowButton(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-2xl bg-white shadow-2xl rounded-lg overflow-hidden transform rotate-1"
      >
        {/* Notebook Styling */}
        <div className="h-8 bg-gray-800 flex items-center px-4 space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        <div className="relative bg-[#fff] p-8 md:p-12 min-h-[60vh] max-h-[75vh] overflow-y-auto custom-scrollbar" ref={scrollRef}
             style={{
               backgroundImage: `linear-gradient(#e5e5e5 1px, transparent 1px)`,
               backgroundSize: '100% 2rem',
               lineHeight: '2rem'
             }}
        >
            {/* Red Margin Line */}
            <div className="absolute top-0 bottom-0 left-8 md:left-12 border-r-2 border-red-200 pointer-events-none h-full z-0"></div>

            <div className="relative z-10 pl-6 md:pl-10">
                <h2 className="font-great-vibes text-3xl md:text-4xl text-deep-pink mb-4 underline decoration-pink-200 decoration-wavy">
                    A Letter For You...
                </h2>
                
                <p className="font-dancing text-xl md:text-2xl text-gray-800 whitespace-pre-wrap leading-[2rem]">
                    {displayedText}
                    <span className="animate-pulse text-deep-pink">|</span>
                </p>
            </div>
        </div>
      </motion.div>

      {/* Next Button */}
      <motion.div
        className="mt-8 h-16"
        initial={{ opacity: 0 }}
        animate={showButton ? { opacity: 1 } : { opacity: 0 }}
      >
        {showButton && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 20, 147, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="bg-deep-pink text-white px-8 py-3 rounded-full font-poppins font-bold text-lg shadow-lg flex items-center gap-2"
          >
            Open Grand Finale <Heart className="w-5 h-5 fill-current animate-bounce" />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};
