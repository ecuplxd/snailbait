export type TimeStamp = number;

export interface KeyBinding {
  command: () => void;
  keys: string | string[];
  name: string;
}
