export type TimeStamp = number;

export interface PlatformData {
  left: number;
  width: number;
  height: number;
  fillStyle: string;
  opacity: number;
  track: number;
  pulsate?: boolean;
  snail?: boolean;
}

export interface KeyBinding {
  name: string;
  keys: string | string[];
  command: () => void;
}
