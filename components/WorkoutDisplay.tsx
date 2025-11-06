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
    completed: 'bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/20 scale-100',
    active: 'bg-gradient-to-br from-amber-400 to-yellow-500 shadow-2xl shadow-amber-500/40 scale-105 ring-2 ring-amber-300/50 dark:ring-amber-400/30 animate-pulse',
    upcoming: 'bg-gray-200/60 dark:bg-gray-700/60 scale-100 border border-gray-300/30 dark:border-gray-600/30',
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
      {/* Grid */}
      <div 
        className="grid gap-2 md:gap-3 lg:gap-4 transition-opacity duration-500"
        style={{
          gridTemplateColumns: `repeat(${steps}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${sets}, minmax(0, 1fr))`,
          aspectRatio: `${steps}/${sets}`,
          width: '100%',
          maxWidth: '85vh',
          maxHeight: '85vh',
          opacity: isFinished ? 0.25 : 1
        }}
      >
        {Array.from({ length: sets }).map((_, setIndex) =>
          Array.from({ length: steps }).map((_, stepIndex) => {
            const state = getCellState(setIndex + 1, stepIndex + 1);
            return (
              <div
                key={`${setIndex}-${stepIndex}`}
                className={`rounded-xl md:rounded-2xl transition-all duration-500 ease-in-out ${cellClasses[state]}`}
              />
            );
          })
        )}
      </div>

      {/* Central Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl p-6 md:p-10 lg:p-12 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-w-[90%] md:max-w-md" role="status" aria-live="polite">
          {isFinished ? (
            <>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400 mb-2">COMPLETE!</h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mt-2">{config.name || 'Great work!'}</p>
              <button 
                onClick={() => onGoHome(true)} 
                className="mt-6 md:mt-8 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg flex items-center justify-center gap-2 pointer-events-auto transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 active:scale-95 mx-auto"
              >
                <RestartIcon className="w-5 h-5 md:w-6 md:h-6" />
                New Session
              </button>
            </>
          ) : isResting ? (
            <>
              <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-700 dark:text-gray-300 tracking-wide">REST</p>
              <p className="text-6xl md:text-8xl lg:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400 my-2">{restTime}</p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-500 dark:text-gray-400 mt-2">Next: Set {currentSet + 1}</p>
            </>
          ) : isPaused ? (
             <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-500 dark:text-gray-400 tracking-wide">PAUSED</h2>
          ) : (
            <>
              <p className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-2">Set {currentSet}/{sets} &bull; Step {currentStep}/{steps}</p>
              <p className="text-6xl md:text-8xl lg:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-400 my-2">
                {counterType === CounterType.DOWN ? time : time + 1}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-500 dark:text-gray-400">seconds</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;