import { TimeStamp } from 'model';
import { singleton } from 'singleton';

@singleton
export class Fps {
  currentTime: TimeStamp = 0;

  currentValue = 60;

  displayFps = 60;

  lastAnimationFrameTime = 0;

  lastFpsUpdateTime = 0;

  calc(
    now: TimeStamp,
    rate: number = 1,
    tickCb?: (fps: number) => void
  ): number {
    // 帧速率表示为 帧/秒
    // 是一帧除以上一个动画帧和当前帧之间的时间间隔
    this.currentTime = now;
    this.currentValue = (1 / (now - this.lastAnimationFrameTime)) * 1000 * rate;

    if (now - this.lastFpsUpdateTime > 1000) {
      this.lastFpsUpdateTime = now;
      this.displayFps = this.format(this.currentValue);

      if (tickCb) {
        tickCb.call(null, this.displayFps);
      }

      console.log(this.displayFps + ' fps');
    }

    return this.currentValue;
  }

  // 求当前时间帧需要移动的像素点
  // 本质还是 速度 * 时间 = 路程
  // 像素/秒（速度） * 秒/帧（时间） = 像素/帧（路程）
  calCurrentFramePixelsToMove(velocity: number, duration = 1000) {
    return (
      velocity * ((this.currentTime - this.lastAnimationFrameTime) / duration)
    );
  }

  format(value: number): number {
    return parseInt(value.toFixed(0), 10);
  }

  increaseUpdate(delta: TimeStamp) {
    this.lastAnimationFrameTime += delta;
  }

  oneFramePassed(lastTime: TimeStamp, animationRate: number): boolean {
    return this.currentTime - lastTime > animationRate;
  }

  update(now: TimeStamp) {
    this.lastAnimationFrameTime = now;
  }
}
