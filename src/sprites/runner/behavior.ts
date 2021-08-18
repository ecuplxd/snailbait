import { Fps } from 'fps';
import { Behavior } from 'sprites/behavior';
import { RunnerSprite } from './sprite';

export class RunnerBehavior extends Behavior<RunnerSprite> {
  actions = [this.run, this.jump, this.collide, this.explode];

  lastAdvanceTime = 0;

  collide(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  explode(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  fall(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  jump(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  run(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (sprite.animationRate === 0) {
      return;
    }

    if (this.lastAdvanceTime === 0) {
      this.lastAdvanceTime = fps.currentTime;
    } else if (fps.oneFramePassed(this.lastAdvanceTime, sprite.animationRate)) {
      sprite.artist.advance();

      this.lastAdvanceTime = fps.currentTime;
    }
  }
}
