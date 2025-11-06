import React, { useState, useEffect, useRef } from 'react';
import { type SessionConfig, CounterType } from '../types';
import { useSound } from '../hooks/useSound';
import RestartIcon from './icons/RestartIcon';

interface WorkoutDisplayProps {
  config: SessionConfig;
  onGoHome: (isFinished: boolean) => void;
  onComplete: (config: SessionConfig) => void;
  isPaused: boolean;
  restartSignal: number;
  onProgress: (progress: { set: number, step: number, isResting: boolean }) => void;
}

const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ config, onGoHome, onComplete, isPaused, restartSignal, onProgress }) => {
  const { steps, duration, sets, delay, counterType } = config;
  
  const [currentSet, setCurrentSet] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [time, setTime] = useState(counterType === CounterType.DOWN ? duration : 0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(delay);
  const [isFinished, setIsFinished] = useState(false);
  
  // Refs to avoid stale state in interval callback
  const currentSetRef = useRef(currentSet);
  const currentStepRef = useRef(currentStep);
  const isRestingRef = useRef(isResting);
  const timeRef = useRef(time);
  // When entering rest, capture which set we should resume on to avoid double-increment
  const restTargetSetRef = useRef<number | null>(null);
  
  const playBeep = useSound(523, 0.15); // C5 note for a clear beep
  const playFinishBeep = useSound(784, 0.5); // G5 note for finish

  useEffect(() => {
    onProgress({ set: currentSet, step: currentStep, isResting });
  }, [currentSet, currentStep, isResting, onProgress]);

  // keep refs in sync with state
  useEffect(() => { currentSetRef.current = currentSet; }, [currentSet]);
  useEffect(() => { currentStepRef.current = currentStep; }, [currentStep]);
  useEffect(() => { isRestingRef.current = isResting; }, [isResting]);
  useEffect(() => { timeRef.current = time; }, [time]);

  const handleRestart = () => {
    setCurrentSet(1);
    setCurrentStep(1);
    setTime(counterType === CounterType.DOWN ? duration : 0);
    setIsResting(false);
    setRestTime(delay);
    setIsFinished(false);
  };

  useEffect(() => {
    handleRestart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restartSignal]);

  useEffect(() => {
    if (isFinished || isPaused) return;

    const interval = setInterval(() => {
      const resting = isRestingRef.current;
      const cs = currentSetRef.current;
      const cstep = currentStepRef.current;
      const t = timeRef.current;

      if (resting) {
        setRestTime(prev => {
          if (prev <= 1) {
            playBeep();
            setIsResting(false);
            const target = restTargetSetRef.current ?? (currentSetRef.current + 1);
            setCurrentSet(() => Math.min(target, sets));
            restTargetSetRef.current = null;
            setCurrentStep(1);
            setTime(counterType === CounterType.DOWN ? duration : 0);
            return delay;
          }
          return prev - 1;
        });
      } else {
        const isStepComplete = counterType === CounterType.DOWN ? t <= 1 : t >= duration - 1;

        if (isStepComplete) {
          playBeep();
          if (cs === sets && cstep === steps) {
            playFinishBeep();
            setIsFinished(true);
            onComplete(config);
          } else if (currentStep === steps) {
            restTargetSetRef.current = cs + 1;
            setIsResting(true);
          } else {
            setCurrentStep(cs => cs + 1);
            setTime(counterType === CounterType.DOWN ? duration : 0);
          }
        } else {
          setTime(v => counterType === CounterType.DOWN ? v - 1 : v + 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isResting, isFinished, isPaused, config, currentSet, currentStep]);

  const getCellState = (setIndex: number, stepIndex: number): 'completed' | 'active' | 'upcoming' => {
    if (setIndex < currentSet || (setIndex === currentSet && stepIndex < currentStep)) {
      return 'completed';
    }
    if (setIndex === currentSet && stepIndex === currentStep && !isFinished) {
      return 'active';
    }
    return 'upcoming';
  };

  const cellClasses = {
    completed: 'bg-green-500/90 shadow-inner shadow-green-900/10 scale-100',
    active: 'bg-yellow-500/90 shadow-lg shadow-yellow-500/30 scale-110 animate-pulse',
    upcoming: 'bg-gray-300/80 dark:bg-gray-700/80 scale-100',
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
      {/* Grid */}
      <div 
        className="grid gap-2 md:gap-4 transition-opacity duration-500"
        style={{
          gridTemplateColumns: `repeat(${steps}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${sets}, minmax(0, 1fr))`,
          aspectRatio: `${steps}/${sets}`,
          width: '100%',
          maxWidth: '80vh',
          maxHeight: '80vh',
          opacity: isFinished ? 0.3 : 1
        }}
      >
        {Array.from({ length: sets }).map((_, setIndex) =>
          Array.from({ length: steps }).map((_, stepIndex) => {
            const state = getCellState(setIndex + 1, stepIndex + 1);
            return (
              <div
                key={`${setIndex}-${stepIndex}`}
                className={`rounded-lg transition-all duration-500 ease-in-out ${cellClasses[state]}`}
              />
            );
          })
        )}
      </div>

      {/* Central Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center bg-gray-50/70 dark:bg-gray-900/70 backdrop-blur-sm p-8 rounded-2xl" role="status" aria-live="polite">
          {isFinished ? (
            <>
              <h2 className="text-6xl md:text-8xl font-black text-green-500 dark:text-green-400">COMPLETE!</h2>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mt-2">{config.name || 'Great work!'}</p>
              <button onClick={() => onGoHome(true)} className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center justify-center gap-2 pointer-events-auto transition-transform transform hover:scale-105">
                <RestartIcon />
                New Session
              </button>
            </>
          ) : isResting ? (
            <>
              <p className="text-3xl md:text-5xl font-bold text-gray-700 dark:text-gray-300">REST</p>
              <p className="text-7xl md:text-9xl font-black text-cyan-500 dark:text-cyan-400">{restTime}</p>
              <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mt-2">Next: Set {currentSet + 1}</p>
            </>
          ) : isPaused ? (
             <h2 className="text-6xl md:text-8xl font-black text-gray-500 dark:text-gray-400">PAUSED</h2>
          ) : (
            <>
              <p className="text-2xl md:text-4xl font-bold text-gray-700 dark:text-gray-300">Set {currentSet}/{sets} &bull; Step {currentStep}/{steps}</p>
              <p className="text-7xl md:text-9xl font-black text-yellow-500 dark:text-yellow-400 my-2">
                {counterType === CounterType.DOWN ? time : time + 1}
              </p>
              <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400">seconds</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;