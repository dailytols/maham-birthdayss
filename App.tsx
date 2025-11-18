
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageState } from './types';
import { MusicPlayer } from './components/MusicPlayer';
import { FloatingHearts } from './components/FloatingHearts';
import { PasswordPage } from './components/PasswordPage';
import { GamePage } from './components/GamePage';
import { WelcomePage } from './components/WelcomePage';
import { TimelinePage } from './components/TimelinePage';
import { QuestionPage } from './components/QuestionPage';
import { LetterPage } from './components/LetterPage';
import { FinalPage } from './components/FinalPage';

const App: React.FC = () => {
  const [page, setPage] = useState<PageState>(PageState.PASSWORD);

  const renderPage = () => {
    switch (page) {
      case PageState.PASSWORD:
        return <PasswordPage onUnlock={() => setPage(PageState.WELCOME)} onPlayGame={() => setPage(PageState.GAME)} />;
      case PageState.GAME:
        return <GamePage onBack={() => setPage(PageState.PASSWORD)} />;
      case PageState.WELCOME:
        return <WelcomePage onNext={() => setPage(PageState.TIMELINE)} />;
      case PageState.TIMELINE:
        return <TimelinePage onNext={() => setPage(PageState.QUESTION)} />;
      case PageState.QUESTION:
        return <QuestionPage onNext={() => setPage(PageState.LETTER)} />;
      case PageState.LETTER:
        return <LetterPage onNext={() => setPage(PageState.FINAL)} />;
      case PageState.FINAL:
        return <FinalPage onReplay={() => setPage(PageState.PASSWORD)} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out
      ${page === PageState.FINAL 
        ? 'bg-gradient-to-br from-deep-pink to-soft-pink' 
        : 'bg-gradient-to-br from-pink-100 via-lavender to-purple-200'
      }
    `}>
      <MusicPlayer />
      
      {/* Persistent background hearts, heavier on final page handled within FinalPage component */}
      {page !== PageState.FINAL && <FloatingHearts />}

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
