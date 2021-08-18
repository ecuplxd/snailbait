import { TRACK_BASELINES } from 'config';

export function calculatePlatformTop(track: number): number {
  return TRACK_BASELINES[track || 1];
}

export function skipFn() {}
