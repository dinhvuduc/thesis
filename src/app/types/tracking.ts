import { Exercise2 } from './exercise';

export interface Tracking {
  _id: string;
  exercise: Exercise2;
  reps: number;
  sets: number;
  date: string;
  weight: number;
  time: number;
  progress?: { weight: number; reps: number }[];
}
