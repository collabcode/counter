import React, { useState } from 'react';
import SetupForm from './components/SetupForm';
import WorkoutDisplay from './components/WorkoutDisplay';
import Header from './components/Header';
import HelpPage from './components/HelpPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import CookieConsent from './components/CookieConsent';
import { type SessionConfig, type SessionHistoryItem } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import useTheme from './hooks/useTheme';

type Page = 'home' | 'help' | 'privacy' | 'cookie';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [history, setHistory] = useLocalStorage<SessionHistoryItem[]>('session-history', []);
  const [isPaused, setIsPaused] = useState(false);
  const [restartSignal, setRestartSignal] = useState(0);
  const [progress, setProgress] = useState({ set: 1, step: 1, isResting: false });
  const { theme, setTheme } = useTheme();

  const handleStartSession = (config: SessionConfig) => {
    setSessionConfig(config);
    setIsPaused(false);
    setRestartSignal(0);
    setProgress({ set: 1, step: 1, isResting: false });
  };

  const handleEndSession = (isFinished: boolean) => {
    if (sessionConfig && !isFinished) {
      // Save incomplete session progress
      const newHistoryItem: SessionHistoryItem = {
        ...sessionConfig,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        status: 'Incomplete',
        completedSets: progress.isResting ? progress.set : progress.set - 1,
        completedSteps: progress.isResting ? sessionConfig.steps : progress.step - 1,
      };
      setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
    }
    setSessionConfig(null);
  };
  
  const handleSessionComplete = (config: SessionConfig) => {
    const newHistoryItem: SessionHistoryItem = {
      ...config,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      status: 'Completed',
      completedSets: config.sets,
      completedSteps: 0, // Not relevant for a fully completed session
    };
    setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
  };
  
  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleRestart = () => {
    setRestartSignal(prev => prev + 1);
    setIsPaused(false);
  };

  const handlePageChange = (page: Page) => {
    if (sessionConfig && page !== 'home') {
      handleEndSession(false);
    }
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 flex flex-col items-center p-4 pt-20 md:pt-24 pb-24 transition-all duration-500">
      <CookieConsent onNavigateToCookiePolicy={() => handlePageChange('cookie')} />
      <Header
        sessionActive={!!sessionConfig}
        isPaused={isPaused}
        onHomeClick={() => {
          handleEndSession(false);
          setCurrentPage('home');
        }}
        onPauseToggleClick={() => setIsPaused(p => !p)}
        onRestartClick={handleRestart}
        theme={theme.name}
        onThemeChange={setTheme}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      
      <main className="w-full max-w-7xl flex-grow flex items-center justify-center py-8">
        {currentPage === 'help' ? (
          <HelpPage onBack={() => setCurrentPage('home')} theme={theme.name} />
        ) : currentPage === 'privacy' ? (
          <PrivacyPolicy onBack={() => setCurrentPage('home')} theme={theme.name} />
        ) : currentPage === 'cookie' ? (
          <CookiePolicy onBack={() => setCurrentPage('home')} theme={theme.name} />
        ) : sessionConfig ? (
          <WorkoutDisplay 
            config={sessionConfig} 
            onGoHome={handleEndSession}
            onComplete={handleSessionComplete}
            isPaused={isPaused}
            restartSignal={restartSignal}
            onProgress={setProgress}
            theme={theme.name}
          />
        ) : (
          <SetupForm 
            onStart={handleStartSession}
            history={history}
            onClearHistory={handleClearHistory}
            theme={theme.name}
          />
        )}
      </main>
    </div>
  );
}

export default App;
