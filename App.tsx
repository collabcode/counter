import React, { useState } from 'react';
import SetupForm from './components/SetupForm';
import WorkoutDisplay from './components/WorkoutDisplay';
import Header from './components/Header';
import { type SessionConfig, type SessionHistoryItem } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import useTheme from './hooks/useTheme';

function App() {
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [history, setHistory] = useLocalStorage<SessionHistoryItem[]>('session-history', []);
  const [isPaused, setIsPaused] = useState(false);
  const [restartSignal, setRestartSignal] = useState(0);
  const [progress, setProgress] = useState({ set: 1, step: 1, isResting: false });
  const { theme, toggleTheme } = useTheme();

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center p-4 pt-24 transition-colors duration-300">
      <Header
        sessionActive={!!sessionConfig}
        isPaused={isPaused}
        onHomeClick={() => handleEndSession(false)}
        onPauseToggleClick={() => setIsPaused(p => !p)}
        onRestartClick={handleRestart}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      
      <main className="w-full max-w-7xl flex-grow flex items-center justify-center">
        {sessionConfig ? (
          <WorkoutDisplay 
            config={sessionConfig} 
            onGoHome={handleEndSession}
            onComplete={handleSessionComplete}
            isPaused={isPaused}
            restartSignal={restartSignal}
            onProgress={setProgress}
          />
        ) : (
          <SetupForm 
            onStart={handleStartSession}
            history={history}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>
    </div>
  );
}

export default App;