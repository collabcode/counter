import React, { useEffect, useState } from 'react';
import { type SessionConfig, CounterType, type SessionHistoryItem } from '../types';
import PlayIcon from './icons/PlayIcon';
import useLocalStorage from '../hooks/useLocalStorage';
import RestartIcon from './icons/RestartIcon';

interface SetupFormProps {
  onStart: (config: SessionConfig) => void;
  history: SessionHistoryItem[];
  onClearHistory: () => void;
}

type InputFieldProps = { label: string, name: string, value: string | number, min?: string, type?: string, placeholder?: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void };

function InputField({ label, name, value, min = "1", type = "number", placeholder = "", onChange }: InputFieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        min={min}
        placeholder={placeholder}
        autoComplete="off"
        required={type === 'number'}
        className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm hover:shadow-md"
      />
    </div>
  );
}

const SetupForm: React.FC<SetupFormProps> = ({ onStart, history, onClearHistory }) => {
  const [config, setConfig] = useLocalStorage<SessionConfig>('session-setup', {
    name: '',
    steps: 3,
    duration: 10,
    sets: 2,
    delay: 5,
    counterType: CounterType.UP,
  });
  
  const [error, setError] = useState('');

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
      <div className="w-full lg:w-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 self-start transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">Session Setup</h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <InputField label="Session Name (Optional)" name="name" value={form.name} type="text" placeholder="e.g., Morning Routine" onChange={handleInputChange}/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="Steps per Set" name="steps" value={form.steps} onChange={handleInputChange} />
            <InputField label="Duration per Step (s)" name="duration" value={form.duration} onChange={handleInputChange} />
            <InputField label="Number of Sets" name="sets" value={form.sets} onChange={handleInputChange} />
            <InputField label="Delay Between Sets (s)" name="delay" value={form.delay} onChange={handleInputChange} />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Counter Type</label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 p-1.5 border border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => handleCounterTypeChange(CounterType.DOWN)}
                className={`w-full py-2.5 rounded-lg transition-all duration-200 font-medium ${
                  form.counterType === CounterType.DOWN 
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
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
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/50'
                }`}
              >
                Count Up
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
              <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-3.5 md:py-4 rounded-xl text-base md:text-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98]"
          >
            <PlayIcon className="w-5 h-5 md:w-6 md:h-6" />
            Start Session
          </button>
        </form>
      </div>

      <div className="w-full lg:w-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 self-start transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">Session History</h2>
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
                    <p className="text-gray-400 dark:text-gray-500 text-sm md:text-base">No sessions completed yet.</p>
                    <p className="text-gray-300 dark:text-gray-600 text-xs mt-2">Start your first session to see history here</p>
                </div>
            ) : (
                history.map(item => {
                    const status = item.status || 'Completed';
                    return (
                        <div key={item.id} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-xl flex flex-col transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600">
                            <div className="flex justify-between items-start gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-base md:text-lg text-gray-900 dark:text-white truncate">
                                        {item.name || 'Untitled Session'}
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        {status === 'Completed' ? 
                                        `${item.sets} Sets • ${item.steps} Steps` :
                                        `Completed ${item.completedSets}/${item.sets} sets, ${item.completedSteps}/${item.steps} steps`
                                        }
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {item.duration}s per step, {item.delay}s rest
                                    </p>
                                </div>
                                <span className={`flex-shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full ${
                                    status === 'Completed' 
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' 
                                        : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                                }`}>
                                    {status}
                                </span>
                            </div>

                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(item.timestamp).toLocaleString()}
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
                })
            )}
        </div>
      </div>
    </div>
  );
};

export default SetupForm;