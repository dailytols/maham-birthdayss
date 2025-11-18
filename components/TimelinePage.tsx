
import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ArrowRight, ArrowLeft, Heart, X, Download } from 'lucide-react';
import { MEMORIES, Memory } from '../types';

interface TimelinePageProps {
  onNext: () => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 10 : -10,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: (Math.random() - 0.5) * 6, // Random tilt for realism
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
      rotate: direction < 0 ? 10 : -10,
      transition: {
        duration: 0.4
      }
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const nextIndex = currentIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < MEMORIES.length) {
      setDirection(newDirection);
      setCurrentIndex(nextIndex);
    }
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      if (currentIndex < MEMORIES.length - 1) paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      if (currentIndex > 0) paginate(-1);
    }
  };

  const currentMemory = MEMORIES[currentIndex];
  const isLastSlide = currentIndex === MEMORIES.length - 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 relative z-10 max-w-6xl mx-auto overflow-hidden">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4 md:mb-8"
      >
        <h2 className="font-playfair text-3xl md:text-5xl text-deep-pink drop-shadow-sm mb-2">
          Our Journey Together
        </h2>
        <p className="font-poppins text-gray-600 text-xs md:text-sm">
          Swipe or tap arrows to browse memories
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-sm md:max-w-md aspect-[3/4] md:aspect-[4/5] flex items-center justify-center mb-8">
        
        {/* Navigation Buttons (Desktop) */}
        <div className="absolute inset-x-[-80px] hidden md:flex justify-between items-center z-20 h-full pointer-events-none">
            <button 
                onClick={() => paginate(-1)} 
                disabled={currentIndex === 0}
                className={`pointer-events-auto p-4 rounded-full bg-white/80 text-deep-pink shadow-lg hover:bg-white transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
            >
                <ArrowLeft size={32} />
            </button>
            
            <button 
                onClick={() => paginate(1)} 
                disabled={currentIndex === MEMORIES.length - 1}
                className={`pointer-events-auto p-4 rounded-full bg-white/80 text-deep-pink shadow-lg hover:bg-white transition-all ${currentIndex === MEMORIES.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
            >
                <ArrowRight size={32} />
            </button>
        </div>

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full h-full cursor-grab active:cursor-grabbing"
            onClick={() => setSelectedMemory(currentMemory)}
          >
            {/* Polaroid Frame */}
            <div className="bg-white p-4 pb-8 md:p-6 md:pb-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] rotate-1 rounded-sm transform transition-transform duration-500 hover:rotate-0 relative">
                
                {/* Washi Tape Effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-200/80 shadow-sm transform -rotate-2 z-20"></div>

                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4 relative shadow-inner">
                    <img 
                        src={currentMemory.imageUrl} 
                        alt={currentMemory.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay pointer-events-none"></div> {/* Sepia/Vintage tint */}
                </div>

                {/* Caption */}
                <div className="text-center">
                    <div className="font-dancing text-2xl md:text-3xl text-gray-800 mb-1 leading-tight">
                        {currentMemory.title}
                    </div>
                    <div className="font-poppins text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mb-2">
                        {currentMemory.date}
                    </div>
                    <p className="font-dancing text-deep-pink text-lg md:text-xl leading-none opacity-80">
                        "{currentMemory.description}"
                    </p>
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls / Progress */}
      <div className="flex flex-col items-center gap-6 z-20 w-full">
        
        {/* Mobile Navigation Arrows */}
        <div className="flex md:hidden gap-8 items-center">
             <button 
                onClick={() => paginate(-1)} 
                disabled={currentIndex === 0}
                className={`p-3 rounded-full bg-white/80 text-deep-pink shadow-md ${currentIndex === 0 ? 'opacity-30' : ''}`}
            >
                <ArrowLeft size={24} />
            </button>
            <span className="font-poppins font-bold text-deep-pink bg-white/50 px-4 py-1 rounded-full">
                {currentIndex + 1} / {MEMORIES.length}
            </span>
            <button 
                onClick={() => paginate(1)} 
                disabled={currentIndex === MEMORIES.length - 1}
                className={`p-3 rounded-full bg-white/80 text-deep-pink shadow-md ${currentIndex === MEMORIES.length - 1 ? 'opacity-30' : ''}`}
            >
                <ArrowRight size={24} />
            </button>
        </div>
        
        {/* Desktop Progress Dots */}
        <div className="hidden md:flex gap-2">
            {MEMORIES.map((_, idx) => (
                <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-deep-pink w-6' : 'bg-pink-200'}`}
                />
            ))}
        </div>

        {isLastSlide && (
             <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 20, 147, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="bg-deep-pink text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-poppins font-bold text-base md:text-lg shadow-lg shadow-pink-500/30 flex items-center gap-2 hover:brightness-110 transition-all mt-2"
            >
                Next Step <Heart className="fill-current animate-pulse" />
            </motion.button>
        )}
      </div>

      {/* Modal for Full View */}
      <AnimatePresence>
        {selectedMemory && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedMemory(null)}
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white p-2 rounded-lg max-w-sm w-full relative shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                     <button 
                        onClick={() => setSelectedMemory(null)}
                        className="absolute -top-12 right-0 text-white p-2"
                    >
                        <X size={30} />
                    </button>
                    
                    <img 
                        src={selectedMemory.imageUrl} 
                        alt={selectedMemory.title} 
                        className="w-full rounded mb-2"
                    />
                    
                    <div className="text-center p-4 bg-white">
                         <h3 className="font-playfair text-2xl font-bold">{selectedMemory.title}</h3>
                         <p className="text-deep-pink font-dancing text-xl mt-1">{selectedMemory.description}</p>
                         <button className="mt-4 flex items-center gap-2 mx-auto text-xs font-bold text-gray-500 uppercase tracking-widest border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                            <Download size={14} /> Save Memory
                         </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
