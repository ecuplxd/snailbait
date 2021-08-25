import { Behavior } from 'behavior/behavior';
import { Fps } from 'fps';
import { TimeStamp } from 'model';
import { CANVAS_HEIGHT, GRAVITY_FORCE, PIXELS_PER_METER } from 'sprites/data';
import { PlatformSprite } from 'sprites/platform/sprite';
import { SnailSprite } from 'sprites/snail/sprite';
import { Sprite } from 'sprites/sprite';
import { AnimationTimer } from 'timer/animationTimer';
import { EaseIn, EaseOut } from 'timer/easing';
import { calculatePlatformTop } from 'utils';
import { JUMP_DURATION } from './data';
import { RunnerSprite } from './sprite';

export class RunnerBehavior extends Behavior<RunnerSprite> {
  actions = [this.run, this.jump, this.collide, this.explode, this.fall];

  // 上升秒表
  ascendTimer = new AnimationTimer(JUMP_DURATION / 2, new EaseOut());

  // 下降秒表
  descendTimer = new AnimationTimer(JUMP_DURATION / 2, new EaseIn());

  fallTimer = new AnimationTimer();

  lastAdvanceTime: TimeStamp = 0;

  ascend(sprite: RunnerSprite) {
    const elapsed = this.ascendTimer.getElapsedTime(this.executeTime);
    const deltaY = sprite.jumpHeight * (elapsed / (sprite.jumpDuration / 2));

    sprite.top = sprite.verticalLaunchPosition - deltaY;
  }

  calculateVerticalDrop(sprite: RunnerSprite, fps: Fps) {
    return fps.calCurrentFramePixelsToMove(sprite.velocityY);
  }

  collide(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {
    this.getRelateSprites()
      .filter(
        (otherSprite) =>
          this.isCandidateForCollision(sprite, otherSprite) &&
          this.didCollide(sprite, otherSprite, context)
      )
      .forEach((otherSprite) => {
        this.processCollision(sprite, otherSprite, fps, context);
      });
  }

  descend(sprite: RunnerSprite) {
    const elapsed = this.descendTimer.getElapsedTime(this.executeTime);
    const deltaY = sprite.jumpHeight * (elapsed / (sprite.jumpDuration / 2));

    sprite.top = sprite.jumpApex + deltaY;
  }

  didCollide(
    sprite: Sprite,
    otherSprite: Sprite,
    context: CanvasRenderingContext2D
  ) {
    return otherSprite instanceof SnailSprite
      ? otherSprite.disCollideWidthOtherSprite(sprite, context)
      : sprite.disCollideWidthOtherSprite(otherSprite, context);
  }

  explode(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {}

  fall(sprite: RunnerSprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (sprite.falling) {
      const outOfPlay = this.isOutOfPlay(sprite);

      if (outOfPlay || sprite.exploding) {
        sprite.stopFalling();

        if (outOfPlay) {
          sprite.loseLife();
        }
      } else {
        this.moveDown(sprite, fps);
      }
    } else {
      if (!sprite.jumping && !sprite.platformUnderneath()) {
        sprite.fall(this.executeTime);
      }
    }
  }

  fallOnPlatform(sprite: RunnerSprite) {
    sprite.stopFalling();
    sprite.putOnTrack(sprite.track);
  }

  finishAscend(sprite: RunnerSprite) {
    sprite.jumpApex = sprite.top;
    this.ascendTimer.stop(this.executeTime);
    this.descendTimer.start(this.executeTime);
  }

  finishDescend(sprite: RunnerSprite) {
    sprite.stopJumping();

    if (sprite.platformUnderneath()) {
      sprite.top = sprite.verticalLaunchPosition;
    } else {
      sprite.fall(
        this.executeTime,
        GRAVITY_FORCE *
          (this.descendTimer.getElapsedTime(this.executeTime) / 1000) *
          PIXELS_PER_METER
      );
    }
  }

  isAscending() {
    return this.ascendTimer.isRunning();
  }

  isCandidateForCollision(sprite: Sprite, otherSprite: Sprite) {
    const s = sprite.calculateCollisionRectangle();
    const o = otherSprite.calculateCollisionRectangle();

    return (
      s.left < o.right &&
      sprite !== otherSprite &&
      sprite.shouldDidCollide() &&
      otherSprite.shouldDidCollide()
    );
  }

  isDescending() {
    return this.descendTimer.isRunning();
  }

  isDoneAscending(sprite: RunnerSprite) {
    return (
      this.ascendTimer.getElapsedTime(this.executeTime) >
      sprite.jumpDuration / 2
    );
  }

  isDoneDescending(sprite: RunnerSprite) {
    return (
      this.descendTimer.getElapsedTime(this.executeTime) >
      sprite.jumpDuration / 2
    );
  }

  isOutOfPlay(sprite: RunnerSprite) {
    return sprite.top > CANVAS_HEIGHT;
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

  moveDown(sprite: RunnerSprite, fps: Fps) {
    this.setVelocity(sprite);

    const dropDistance = this.calculateVerticalDrop(sprite, fps);

    if (!this.willFallBelowCurrentTrack(sprite, dropDistance)) {
      sprite.top += dropDistance;
    } else {
      if (sprite.platformUnderneath()) {
        this.fallOnPlatform(sprite);

        sprite.stopFalling();
      } else {
        sprite.track--;
        sprite.top += dropDistance;
      }
    }
  }

  pause() {
    this.fallTimer.pause(this.executeTime);

    if (this.ascendTimer.isRunning()) {
      this.ascendTimer.pause(this.executeTime);
    } else if (this.descendTimer.isRunning()) {
      this.descendTimer.pause(this.executeTime);
    }
  }

  processAssetCollision(sprite: Sprite) {
    sprite.hide();
  }

  processBadGuyCollision(
    sprite: RunnerSprite,
    fps: Fps,
    context: CanvasRenderingContext2D
  ) {
    this.explode(sprite, fps, context);
  }

  processCollision(
    sprite: RunnerSprite,
    otherSprite: Sprite,
    fps: Fps,
    context: CanvasRenderingContext2D
  ) {
    const { type } = otherSprite;

    if (sprite.jumping && type === 'platform') {
      this.processPlatformCollisionDuringJump(
        sprite,
        otherSprite as PlatformSprite
      );
    } else if (
      type === 'coin' ||
      type === 'sapphire' ||
      type === 'ruby' ||
      type === 'snail'
    ) {
      this.processAssetCollision(otherSprite);
    }

    if (type === 'bat' || type === 'bee' || type === 'snail bomb') {
      this.processBadGuyCollision(sprite, fps, context);
    }
  }

  processPlatformCollisionDuringJump(
    sprite: RunnerSprite,
    platformSprite: PlatformSprite
  ) {
    const isDescending = this.descendTimer.isRunning();

    sprite.stopJumping();

    if (isDescending) {
      sprite.putOnTrack(platformSprite.track);
    } else {
      sprite.fall(this.executeTime);
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

  setVelocity(sprite: RunnerSprite) {
    sprite.velocityY =
      sprite.initialVelocityY +
      GRAVITY_FORCE *
        (this.fallTimer.getElapsedTime(this.executeTime) / 1000) *
        PIXELS_PER_METER;
  }

  unpause() {
    this.fallTimer.unpause(this.executeTime);

    if (this.ascendTimer.isRunning()) {
      this.ascendTimer.unpause(this.executeTime);
    } else if (this.descendTimer.isRunning()) {
      this.descendTimer.unpause(this.executeTime);
    }
  }

  willFallBelowCurrentTrack(sprite: RunnerSprite, dropDistance: number) {
    return (
      sprite.top + sprite.height + dropDistance >
      calculatePlatformTop(sprite.track)
    );
  }
}
