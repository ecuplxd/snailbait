import { TRACK_BASELINES } from 'config';
import { TimeStamp } from 'model';

export function calculatePlatformTop(track: number): number {
  return TRACK_BASELINES[track || 1];
}

// 求当前时间帧需要移动的像素点
// 秒/帧 * 像素/秒 = 像素/帧
export function calCurrentFrameNeedToMovePixel(
  now: TimeStamp,
  lastAnimationFrameTime: TimeStamp,
  velocity: number
): number {
  return velocity * ((now - lastAnimationFrameTime) / 1000);
}
