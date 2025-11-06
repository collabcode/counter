
import { useCallback, useRef } from 'react';

export const useSound = (frequency = 440, duration = 0.1, volume = 0.5) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const context = audioContextRef.current;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      gainNode.gain.setValueAtTime(volume, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);
    }
  }, [frequency, duration, volume]);

  return play;
};
