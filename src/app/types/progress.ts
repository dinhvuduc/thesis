import { Tracking } from './tracking';

export interface Progress {
  _id: string;
  date: string;
  trackings: (string | Tracking)[];
  startAt?: string;
  time: number;
}
