import { Duration } from 'date-fns';

export interface TimeDuration extends Duration {
  ms?: number;
  durationInSeconds: number;
}
