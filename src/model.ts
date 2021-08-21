import { StopWatch } from 'stopWatch';

export type TimeStamp = number;

export type StopWatchPair = StopWatch[];

export interface KeyBinding {
  command: () => void;
  keys: string | string[];
  name: string;
}
