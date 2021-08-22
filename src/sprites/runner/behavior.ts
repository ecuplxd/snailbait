import { Behavior } from 'behavior/behavior';
import { Fps } from 'fps';
import { TimeStamp } from 'model';
import { AnimationTimer } from 'timer/animationTimer';
import { EaseOut, EaseIn } from 'timer/easing';
import { JUMP_DURATION, RUN_ANIMATION_RATE } from './data';
import { RunnerSprite } from './sprite';

export class RunnerBehavior extends Behavior<RunnerSprite> {
  actions = [this.run, this.jump, this.collide, this.explode];

  // 上升秒表
  ascendTimer = new AnimationTimer(JUMP_DURATION / 2, new EaseOut());

  // 下降秒表
  descendTimer = new AnimationTimer(JUMP_DURATION / 2, new EaseIn());

  lastAdvanceTime: TimeStamp = 0;

  ascend(sprite: RunnerSprite) {
    const elapsed = this.ascendTimer.getElapsedTime();
    const deltaY = sprite.jumpHeight * (elapsed / (sprite.jumpDuration / 2));

    sprite.top = sprite.verticalLaunchPosition - deltaY;
  }

  collide(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  descend(sprite: RunnerSprite) {
    const elapsed = this.descendTimer.getElapsedTime();
    const deltaY = sprite.jumpHeight * (elapsed / (sprite.jumpDuration / 2));

    sprite.top = sprite.jumpApex + deltaY;
  }

  explode(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  fall(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  finishAscend(sprite: RunnerSprite) {
    sprite.jumpApex = sprite.top;
    this.ascendTimer.stop();
    this.descendTimer.start();
  }

  finishDescend(sprite: RunnerSprite) {
    sprite.top = sprite.verticalLaunchPosition;
    sprite.stopJumping();
    sprite.animationRate = RUN_ANIMATION_RATE;
  }

  isAscending() {
    return this.ascendTimer.isRunning();
  }

  isDescending() {
    return this.descendTimer.isRunning();
  }

  isDoneAscending(sprite: RunnerSprite) {
    return this.ascendTimer.getElapsedTime() > sprite.jumpDuration / 2;
  }

  isDoneDescending(sprite: RunnerSprite) {
    return this.descendTimer.getElapsedTime() > sprite.jumpDuration / 2;
  }

  jump(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (!sprite.canJump()) {
      return;
    }

    if (this.isAscending()) {
      if (!this.isDoneAscending(sprite)) {
        this.ascend(sprite);
      } else {
        this.finishAscend(sprite);
      }
    } else if (this.isDescending()) {
      if (!this.isDoneDescending(sprite)) {
        this.descend(sprite);
      } else {
        this.finishDescend(sprite);
      }
    }
  }

  pause() {
    if (this.ascendTimer.isRunning()) {
      this.ascendTimer.pause();
    } else if (this.descendTimer.isRunning()) {
      this.descendTimer.pause();
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

  unpause() {
    if (this.ascendTimer.isRunning()) {
      this.ascendTimer.unpause();
    } else if (this.descendTimer.isRunning()) {
      this.descendTimer.unpause();
    }
  }
}
