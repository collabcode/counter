export enum CounterType {
  UP = 'UP',
  DOWN = 'DOWN',
}

export interface SessionConfig {
  name: string;
  steps: number;
  duration: number;
  sets: number;
  delay: number;
  counterType: CounterType;
}

export type SessionStatus = 'Completed' | 'Incomplete';

export interface SessionHistoryItem extends SessionConfig {
  id: string;
  timestamp: string;
  status: SessionStatus;
  completedSets: number;
  completedSteps: number;
}
