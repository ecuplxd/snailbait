import { Behavior } from 'behavior/behavior';
import { Fps } from 'fps';
import { TimeStamp } from 'model';
import { PlatformSprite } from 'sprites/platform/sprite';
import { SnailSprite } from 'sprites/snail/sprite';
import { Sprite } from 'sprites/sprite';
import { AnimationTimer } from 'timer/animationTimer';
import { EaseIn, EaseOut } from 'timer/easing';
import { calculatePlatformTop } from 'utils';
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
    const elapsed = this.ascendTimer.getElapsedTime(this.executeTime);
    const deltaY = sprite.jumpHeight * (elapsed / (sprite.jumpDuration / 2));

    sprite.top = sprite.verticalLaunchPosition - deltaY;
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
    sprite.track = 1;
    sprite.top = calculatePlatformTop(sprite.track) - sprite.height;
  }

  finishAscend(sprite: RunnerSprite) {
    sprite.jumpApex = sprite.top;
    this.ascendTimer.stop(this.executeTime);
    this.descendTimer.start(this.executeTime);
  }

  finishDescend(sprite: RunnerSprite) {
    sprite.top = sprite.verticalLaunchPosition;
    sprite.stopJumping();
    sprite.animationRate = RUN_ANIMATION_RATE;
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
        otherSprite as PlatformSprite,
        fps,
        context
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
    platformSprite: PlatformSprite,
    fps: Fps,
    context: CanvasRenderingContext2D
  ) {
    const isDescending = (
      sprite.behavior as unknown as RunnerBehavior
    ).descendTimer.isRunning();

    sprite.stopJumping();

    if (isDescending) {
      sprite.putOnTrack(platformSprite);
    } else {
      this.fall(sprite, fps, context);
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
      this.ascendTimer.unpause(this.executeTime);
    } else if (this.descendTimer.isRunning()) {
      this.descendTimer.unpause(this.executeTime);
    }
  }
}
