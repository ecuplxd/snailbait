import { Timer } from 'timer/timer';

export type TimeStamp = number;

export type TimerPair = Timer[];

export interface KeyBinding {
  command: () => void;
  keys: string | string[];
  name: string;
}
