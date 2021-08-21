import { Behavior } from 'behavior/behavior';
import { Fps } from 'fps';
import { TimeStamp } from 'model';
import { RUN_ANIMATION_RATE } from './data';
import { RunnerSprite } from './sprite';

export class RunnerBehavior extends Behavior<RunnerSprite> {
  actions = [this.run, this.jump, this.collide, this.explode];

  lastAdvanceTime: TimeStamp = 0;

  ascend(sprite: RunnerSprite) {
    const elapsed = sprite.ascendTimer.getElapsedTime();
    const deltaY = sprite.jumpHeight * (elapsed / (sprite.jumpDuration / 2));

    sprite.top = sprite.verticalLaunchPosition - deltaY;
  }

  collide(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  descend(sprite: RunnerSprite) {
    const elapsed = sprite.descendTimer.getElapsedTime();
    const deltaY = sprite.jumpHeight * (elapsed / (sprite.jumpDuration / 2));

    sprite.top = sprite.jumpApex + deltaY;
  }

  explode(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  fall(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  finishAscend(sprite: RunnerSprite) {
    sprite.jumpApex = sprite.top;
    sprite.ascendTimer.stop();
    sprite.descendTimer.start();
  }

  finishDescend(sprite: RunnerSprite) {
    sprite.top = sprite.verticalLaunchPosition;
    sprite.stopJumping();
    sprite.animationRate = RUN_ANIMATION_RATE;
  }

  isAscending(sprite: RunnerSprite) {
    return sprite.ascendTimer.isRunning();
  }

  isDescending(sprite: RunnerSprite) {
    return sprite.descendTimer.isRunning();
  }

  isDoneAscending(sprite: RunnerSprite) {
    return sprite.ascendTimer.getElapsedTime() > sprite.jumpDuration / 2;
  }

  isDoneDescending(sprite: RunnerSprite) {
    return sprite.descendTimer.getElapsedTime() > sprite.jumpDuration / 2;
  }

  jump(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (!sprite.canJump()) {
      return;
    }

    if (this.isAscending(sprite)) {
      if (!this.isDoneAscending(sprite)) {
        this.ascend(sprite);
      } else {
        this.finishAscend(sprite);
      }
    } else if (this.isDescending(sprite)) {
      if (!this.isDoneDescending(sprite)) {
        this.descend(sprite);
      } else {
        this.finishDescend(sprite);
      }
    }
  }

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
