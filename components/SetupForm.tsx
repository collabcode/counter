import React, { useEffect, useState } from 'react';
import { type SessionConfig, CounterType, type SessionHistoryItem } from '../types';
import PlayIcon from './icons/PlayIcon';
import useLocalStorage from '../hooks/useLocalStorage';
import RestartIcon from './icons/RestartIcon';
import { ThemeName } from '../hooks/useTheme';
import { getThemeTextGradient, getThemeButtonClasses, getThemeBadgeClasses, getThemeGradient } from '../utils/themeUtils';

interface SetupFormProps {
  onStart: (config: SessionConfig) => void;
  history: SessionHistoryItem[];
  onClearHistory: () => void;
  theme?: ThemeName;
}

// Field limits to prevent crashes and browser issues
const FIELD_LIMITS = {
  steps: { min: 1, max: 50 },
  duration: { min: 1, max: 3600 }, // 1 second to 1 hour
  sets: { min: 1, max: 100 },
  delay: { min: 1, max: 3600 }, // 1 second to 1 hour
} as const;

type InputFieldProps = { 
  label: string, 
  name: string, 
  value: string | number, 
  min?: string, 
  max?: string,
  maxLength?: string,
  type?: string, 
  placeholder?: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
};

function InputField({ label, name, value, min = "1", max, maxLength, type = "number", placeholder = "", onChange, title }: InputFieldProps & { title?: string }) {
  return (
    <div className="flex flex-col w-full h-full justify-between">
      <label htmlFor={name} className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 min-h-[2.5rem] flex items-start leading-tight">
        <span className="flex-1 break-words">
          {label}
          {title && (
            <span className="ml-1 text-gray-400 dark:text-gray-500 inline-block" title={title}>
              ℹ️
            </span>
          )}
        </span>
      </label>
      <div className="flex-shrink-0">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          maxLength={maxLength ? parseInt(maxLength, 10) : undefined}
          placeholder={placeholder}
          autoComplete="off"
          required={type === 'number'}
          className="w-full bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm hover:shadow-md"
        />
      </div>
    </div>
  );
}

const SetupForm: React.FC<SetupFormProps> = ({ onStart, history, onClearHistory, theme = 'emerald' }) => {
  const [config, setConfig] = useLocalStorage<SessionConfig>('session-setup', {
    name: '',
    steps: 3,
    duration: 10,
    sets: 2,
    delay: 5,
    counterType: CounterType.UP,
  });
  
  const [error, setError] = useState('');
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  // Local form state to make number inputs easy to edit (allow empty while typing)
  const [form, setForm] = useState({
    name: config.name,
    steps: String(config.steps),
    duration: String(config.duration),
    sets: String(config.sets),
    delay: String(config.delay),
    counterType: config.counterType,
  });

  // Keep form in sync when stored config changes (e.g., load from history)
  useEffect(() => {
    setForm({
      name: config.name,
      steps: String(config.steps),
      duration: String(config.duration),
      sets: String(config.sets),
      delay: String(config.delay),
      counterType: config.counterType,
    });
  }, [config.name, config.steps, config.duration, config.sets, config.delay, config.counterType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? value : value,
    }));
  };
  
  const handleCounterTypeChange = (type: CounterType) => {
    setForm(prev => ({ ...prev, counterType: type }));
  };

  const handleLoadConfig = (item: SessionHistoryItem) => {
    const loaded = {
      name: item.name,
      steps: item.steps,
      duration: item.duration,
      sets: item.sets,
      delay: item.delay,
      counterType: item.counterType,
    };
    setConfig(loaded);
    setForm({
      name: loaded.name,
      steps: String(loaded.steps),
      duration: String(loaded.duration),
      sets: String(loaded.sets),
      delay: String(loaded.delay),
      counterType: loaded.counterType,
    });
  };

  // Group history by date
  const groupHistoryByDate = () => {
    const grouped: Record<string, SessionHistoryItem[]> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    history.forEach(item => {
      const itemDate = new Date(item.timestamp);
      itemDate.setHours(0, 0, 0, 0);
      const dateKey = itemDate.toISOString().split('T')[0];
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(item);
    });
    
    // Sort dates descending (newest first)
    const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
    
    return { grouped, sortedDates, today };
  };

  const toggleDateGroup = (dateKey: string) => {
    setExpandedDates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dateKey)) {
        newSet.delete(dateKey);
      } else {
        newSet.add(dateKey);
      }
      return newSet;
    });
  };

  const formatDateHeader = (dateKey: string, today: Date) => {
    const date = new Date(dateKey);
    const isToday = date.getTime() === today.getTime();
    const isYesterday = date.getTime() === today.getTime() - 86400000;
    
    if (isToday) return 'Today';
    if (isYesterday) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Initialize expanded dates - expand today by default on first load
  useEffect(() => {
    if (history.length > 0 && expandedDates.size === 0) {
      const { today } = groupHistoryByDate();
      const todayKey = today.toISOString().split('T')[0];
      setExpandedDates(new Set([todayKey]));
    }
  }, [history.length]); // Only run when history length changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form values before parsing
    const stepsNum = parseInt(form.steps, 10);
    const durationNum = parseInt(form.duration, 10);
    const setsNum = parseInt(form.sets, 10);
    const delayNum = parseInt(form.delay, 10);
    
    // Check for empty strings, NaN, or non-positive values
    if (
      !form.steps || !form.duration || !form.sets || !form.delay ||
      isNaN(stepsNum) || isNaN(durationNum) || isNaN(setsNum) || isNaN(delayNum) ||
      stepsNum <= 0 || durationNum <= 0 || setsNum <= 0 || delayNum <= 0
    ) {
      setError('All numeric values must be positive numbers.');
      return;
    }
    
    // Check maximum limits to prevent crashes
    if (stepsNum > FIELD_LIMITS.steps.max) {
      setError(`Steps per Set must be between ${FIELD_LIMITS.steps.min} and ${FIELD_LIMITS.steps.max}.`);
      return;
    }
    if (durationNum > FIELD_LIMITS.duration.max) {
      setError(`Duration per Step must be between ${FIELD_LIMITS.duration.min} and ${FIELD_LIMITS.duration.max} seconds (max 1 hour).`);
      return;
    }
    if (setsNum > FIELD_LIMITS.sets.max) {
      setError(`Number of Sets must be between ${FIELD_LIMITS.sets.min} and ${FIELD_LIMITS.sets.max}.`);
      return;
    }
    if (delayNum > FIELD_LIMITS.delay.max) {
      setError(`Delay Between Sets must be between ${FIELD_LIMITS.delay.min} and ${FIELD_LIMITS.delay.max} seconds (max 1 hour).`);
      return;
    }
    
    // Check total grid size to prevent browser crashes (max 5000 cells)
    const totalCells = stepsNum * setsNum;
    if (totalCells > 5000) {
      setError(`Total cells (Steps × Sets = ${totalCells}) exceeds the maximum of 5000. Please reduce Steps or Sets.`);
      return;
    }
    
    const parsedConfig: SessionConfig = {
      name: form.name.trim(),
      steps: stepsNum,
      duration: durationNum,
      sets: setsNum,
      delay: delayNum,
      counterType: form.counterType,
    };
    
    setError('');
    setConfig(parsedConfig); // persist chosen config
    onStart(parsedConfig);
  };

  

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-8">
      <div className="w-full lg:w-1/2 lg:flex-shrink-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
        <h2 className={`text-2xl md:text-3xl font-bold text-center mb-6 bg-clip-text text-transparent ${getThemeTextGradient(theme)}`}>Setup</h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <InputField label="Name (Optional)" name="name" value={form.name} type="text" placeholder="e.g., Morning Session" onChange={handleInputChange} maxLength="100"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:items-stretch">
            <InputField 
              label={`Steps per Set (${FIELD_LIMITS.steps.min}-${FIELD_LIMITS.steps.max})`} 
              name="steps" 
              value={form.steps} 
              min={String(FIELD_LIMITS.steps.min)}
              max={String(FIELD_LIMITS.steps.max)}
              onChange={handleInputChange}
              title="Number of timed intervals in each set"
            />
            <InputField 
              label={`Duration per Step (${FIELD_LIMITS.duration.min}-${FIELD_LIMITS.duration.max} seconds)`} 
              name="duration" 
              value={form.duration} 
              min={String(FIELD_LIMITS.duration.min)}
              max={String(FIELD_LIMITS.duration.max)}
              onChange={handleInputChange}
              title="How long each step lasts in seconds"
            />
            <InputField 
              label={`Number of Sets (${FIELD_LIMITS.sets.min}-${FIELD_LIMITS.sets.max})`} 
              name="sets" 
              value={form.sets} 
              min={String(FIELD_LIMITS.sets.min)}
              max={String(FIELD_LIMITS.sets.max)}
              onChange={handleInputChange}
              title="Total number of sets to complete"
            />
            <InputField 
              label={`Rest Between Sets (${FIELD_LIMITS.delay.min}-${FIELD_LIMITS.delay.max} seconds)`} 
              name="delay" 
              value={form.delay} 
              min={String(FIELD_LIMITS.delay.min)}
              max={String(FIELD_LIMITS.delay.max)}
              onChange={handleInputChange}
              title="Rest time between sets in seconds"
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Counting Direction</label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 p-1.5 border border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => handleCounterTypeChange(CounterType.DOWN)}
                className={`w-full py-2.5 rounded-lg transition-all duration-200 font-medium ${
                  form.counterType === CounterType.DOWN 
                    ? `${getThemeButtonClasses(theme)} text-white shadow-md` 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/50'
                }`}
              >
                Count Down
              </button>
              <button
                type="button"
                onClick={() => handleCounterTypeChange(CounterType.UP)}
                className={`w-full py-2.5 rounded-lg transition-all duration-200 font-medium ${
                  form.counterType === CounterType.UP 
                    ? `${getThemeButtonClasses(theme)} text-white shadow-md` 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/50'
                }`}
              >
                Count Up
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3" role="alert" aria-live="polite" id="form-error">
              <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            className={`w-full ${getThemeButtonClasses(theme)} text-white font-bold py-3.5 md:py-4 rounded-xl text-base md:text-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]`}
          >
            <PlayIcon className="w-5 h-5 md:w-6 md:h-6" />
            Start
          </button>
        </form>
      </div>

      <div className="w-full lg:w-1/2 lg:flex-shrink-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent ${getThemeTextGradient(theme)}`}>History</h2>
            {history.length > 0 && (
                <button 
                    onClick={onClearHistory}
                    className="text-xs md:text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 px-3 md:py-2 md:px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                    Clear History
                </button>
            )}
        </div>
        <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-2 custom-scrollbar">
            {history.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400 dark:text-gray-500 text-sm md:text-base">No sessions yet.</p>
                    <p className="text-gray-300 dark:text-gray-600 text-xs mt-2">Complete a session to see it here</p>
                </div>
            ) : (() => {
                const { grouped, sortedDates, today } = groupHistoryByDate();
                const todayKey = today.toISOString().split('T')[0];
                
                return sortedDates.map(dateKey => {
                    const items = grouped[dateKey];
                    const isExpanded = expandedDates.has(dateKey);
                    const isToday = dateKey === todayKey;
                    // Today is always shown by default (expanded), unless explicitly collapsed
                    // Other dates are only shown if explicitly expanded
                    const shouldShow = isToday ? (expandedDates.size === 0 || isExpanded) : isExpanded;
                    
                    return (
                        <div key={dateKey} className="space-y-2">
                            <button
                                onClick={() => toggleDateGroup(dateKey)}
                                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 group"
                            >
                                <div className="flex items-center gap-2">
                                    <svg 
                                        className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${shouldShow ? 'rotate-90' : ''}`}
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    <span className="font-semibold text-sm md:text-base text-gray-700 dark:text-gray-300">
                                        {formatDateHeader(dateKey, today)}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {items.length} {items.length === 1 ? 'session' : 'sessions'}
                                </span>
                            </button>
                            
                            {shouldShow && (
                                <div className="space-y-2 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                                    {items.map(item => {
                                        const status = item.status || 'Completed';
                                        return (
                                            <div key={item.id} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-xl flex flex-col transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600">
                                                <div className="flex justify-between items-start gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-base md:text-lg text-gray-900 dark:text-white truncate">
                                                            {item.name || 'Untitled'}
                                                        </p>
                                                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                            {status === 'Completed' ? 
                                                            `${item.sets} Sets • ${item.steps} Steps` :
                                                            `Completed ${item.completedSets}/${item.sets} sets, ${item.completedSteps}/${item.steps} steps`
                                                            }
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {item.duration}s per step • {item.delay}s rest
                                                        </p>
                                                    </div>
                                                    <span className={`flex-shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full ${
                                                        status === 'Completed' 
                                                            ? `${getThemeBadgeClasses(theme, true)}` 
                                                            : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                                                    }`}>
                                                        {status}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(item.timestamp).toLocaleTimeString('en-US', { 
                                                            hour: '2-digit', 
                                                            minute: '2-digit',
                                                            hour12: true 
                                                        })}
                                                    </p>
                                                    <button
                                                        onClick={() => handleLoadConfig(item)}
                                                        className="text-xs md:text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md active:scale-95"
                                                        aria-label="Load this session configuration"
                                                    >
                                                      <RestartIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                      Load
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                });
            })()}
        </div>
      </div>
    </div>
  );
};

export default SetupForm;