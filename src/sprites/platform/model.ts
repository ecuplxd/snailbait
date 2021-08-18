export interface PlatformData {
  fillStyle: string;
  height: number;
  left: number;
  opacity: number;
  pulsate?: boolean;
  snail?: boolean;
  track: number;
  width: number;
}

export class PlatformInfo {
  constructor(public platformIndex: number) {}
}
