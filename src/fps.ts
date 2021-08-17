import { TimeStamp } from 'model';
import { singleton } from 'singleton';

@singleton
class Fps {
  lastAnimationFrameTime = 0;

  lastFpsUpdateTime = 0;

  displayFps = 60;

  calc(now: TimeStamp, tickCb?: (fps: number) => void): number {
    // 帧速率表示为 帧/秒
    // 是一帧除以上一个动画帧和当前帧之间的时间间隔
    let fps = (1 / (now - this.lastAnimationFrameTime)) * 1000;

    if (now - this.lastFpsUpdateTime > 1000) {
      this.lastFpsUpdateTime = now;
      this.displayFps = this.format(fps);

      tickCb && tickCb.call(null, this.displayFps);

      console.log(this.displayFps + ' fps');
    }

    return fps;
  }

  update(now: TimeStamp) {
    this.lastAnimationFrameTime = now;
  }

  increaseUpdate(delta: TimeStamp) {
    this.lastAnimationFrameTime += delta;
  }

  format(fps: number): number {
    return parseInt(fps.toFixed(0), 10);
  }
}

export const fps = new Fps();
