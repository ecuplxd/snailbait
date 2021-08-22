import { Fps } from 'fps';
import { Sprite } from 'sprites/sprite';
import { AnimationTimer } from 'timer/animationTimer';
import { EaseOutIn } from 'timer/easing';
import { Behavior } from './behavior';

export class BounceBehavior extends Behavior {
  static DISTANCE = 100;

  static DURATION = 1000;

  actions = [this.bounce];

  baseline!: number;

  bouncing = false;

  timer!: AnimationTimer;

  constructor(
    public duration: number = BounceBehavior.DURATION,
    public distance: number = BounceBehavior.DISTANCE
  ) {
    super();

    this.timer = new AnimationTimer(duration, new EaseOutIn());
    this.timers.push(this.timer);
  }

  adjustVerticalPosition(sprite: Sprite, elapsed: number) {
    let rising = false;
    const deltaY =
      (this.timer.getElapsedTime() / this.duration) * this.distance;

    if (elapsed < this.duration / 2) {
      rising = true;
    }

    if (rising) {
      sprite.top = this.baseline - deltaY;
    } else {
      sprite.top = this.baseline - this.distance + deltaY;
    }
  }

  bounce(sprite: Sprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (!this.bouncing) {
      this.startBouncing(sprite);
    } else {
      const elapsed = this.timer.getElapsedTime();

      if (this.timer.isExpired()) {
        this.resetTimer(this.timer);

        return;
      }

      this.adjustVerticalPosition(sprite, elapsed);
    }
  }

  startBouncing(sprite: Sprite) {
    this.baseline = sprite.top;
    this.bouncing = true;
    this.timer.start();
  }
}
