import React, { useState } from 'react';
import { type SessionConfig, CounterType, type SessionHistoryItem } from '../types';
import PlayIcon from './icons/PlayIcon';
import useLocalStorage from '../hooks/useLocalStorage';
import RestartIcon from './icons/RestartIcon';

interface SetupFormProps {
  onStart: (config: SessionConfig) => void;
  history: SessionHistoryItem[];
  onClearHistory: () => void;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setConfig(prev => {
      const key = name as keyof SessionConfig;
      const isNumericField = key === 'steps' || key === 'duration' || key === 'sets' || key === "delay";
      const nextValue = isNumericField ? Number(value) : value;
      return { ...prev, [key]: nextValue as any };
    });
  };
  
  const handleCounterTypeChange = (type: CounterType) => {
    setConfig(prev => ({ ...prev, counterType: type }));
  };

  const handleLoadConfig = (item: SessionHistoryItem) => {
    setConfig({
      name: item.name,
      steps: item.steps,
      duration: item.duration,
      sets: item.sets,
      delay: item.delay,
      counterType: item.counterType,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedConfig = {
      ...config,
      steps: parseInt(String(config.steps)),
      duration: parseInt(String(config.duration)),
      sets: parseInt(String(config.sets)),
      delay: parseInt(String(config.delay)),
    };
    
    const { counterType: _, name: __, ...numericValues } = parsedConfig;

    if (Object.values(numericValues).some(val => isNaN(val) || val <= 0)) {
      setError('All numeric values must be positive numbers.');
      return;
    }
    setError('');
    onStart(parsedConfig);
  };

  const InputField = ({ label, name, value, min = "1", type = "number", placeholder = "" }: { label: string, name: string, value: string | number, min?: string, type?: string, placeholder?: string }) => (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2 font-semibold text-gray-600 dark:text-gray-300">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleInputChange}
        min={min}
        placeholder={placeholder}
        required={type === 'number'}
        className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition text-gray-900 dark:text-white"
      />
    </div>
  );

  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 self-start transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-600 dark:text-green-400">Session Setup</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Session Name (Optional)" name="name" value={config.name} type="text" placeholder="e.g., Morning Routine"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Steps per Set" name="steps" value={config.steps} />
            <InputField label="Duration per Step (s)" name="duration" value={config.duration} />
            <InputField label="Number of Sets" name="sets" value={config.sets} />
            <InputField label="Delay Between Sets (s)" name="delay" value={config.delay} />
          </div>
          
          <div>
            <label className="mb-2 block font-semibold text-gray-600 dark:text-gray-300">Counter Type</label>
            <div className="flex items-center space-x-4 rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
              <button
                type="button"
                onClick={() => handleCounterTypeChange(CounterType.DOWN)}
                className={`w-full py-2 rounded-md transition-colors ${config.counterType === CounterType.DOWN ? 'bg-green-500 text-white font-bold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                Count Down
              </button>
              <button
                type="button"
                onClick={() => handleCounterTypeChange(CounterType.UP)}
                className={`w-full py-2 rounded-md transition-colors ${config.counterType === CounterType.UP ? 'bg-green-500 text-white font-bold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                Count Up
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 dark:text-red-400 text-center">{error}</p>}

          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-2 transition-transform transform hover:scale-105">
            <PlayIcon className="w-6 h-6" />
            Start Session
          </button>
        </form>
      </div>

      <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 self-start transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">Session History</h2>
            {history.length > 0 && (
                <button 
                    onClick={onClearHistory}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    Clear History
                </button>
            )}
        </div>
        <div className="space-y-4 max-h-[28rem] overflow-y-auto pr-2">
            {history.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No sessions completed yet.</p>
            ) : (
                history.map(item => {
                    const status = item.status || 'Completed'; // Default for old items
                    return (
                        <div key={item.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex flex-col transition-colors duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                                        {item.name || 'Untitled Session'}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {status === 'Completed' ? 
                                        `${item.sets} Sets • ${item.steps} Steps` :
                                        `Completed ${item.completedSets}/${item.sets} sets, ${item.completedSteps}/${item.steps} steps`
                                        }
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {item.duration}s per step, {item.delay}s rest
                                    </p>
                                </div>
                                <span className={`flex-shrink-0 ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                                    status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300'
                                }`}>
                                    {status}
                                </span>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(item.timestamp).toLocaleString()}
                                </p>
                                <button
                                    onClick={() => handleLoadConfig(item)}
                                    className="text-sm bg-blue-500/80 hover:bg-blue-600/80 text-white font-semibold py-1 px-3 rounded-lg transition flex items-center gap-1.5"
                                    aria-label="Load this session configuration"
                                >
                                  <RestartIcon className="w-4 h-4" />
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