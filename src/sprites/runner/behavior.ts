import { Behavior } from 'behavior/behavior';
import { Fps } from 'fps';
import { TimeStamp } from 'model';
import { RunnerSprite } from './sprite';

export class RunnerBehavior extends Behavior<RunnerSprite> {
  actions = [this.run, this.jump, this.collide, this.explode];

  lastAdvanceTime: TimeStamp = 0;

  collide(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  explode(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  fall(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  jump(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  run(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (sprite.animationRate === 0) {
      return;
    }

    if (this.skipFirst()) {
      this.updateLastAdvanceTime(fps);
    } else if (
      // 1000 / animationRate 一帧持续的时间
      fps.oneFramePassed(this.lastAdvanceTime, 1000 / sprite.animationRate)
    ) {
      this.advanceArtist(sprite, fps);
    }
  }
}
