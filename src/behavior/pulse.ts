import { Fps } from 'fps';
import { Sprite } from 'sprites/sprite';
import { AnimationTimer } from 'timer/animationTimer';
import { EaseInOut } from 'timer/easing';
import { Behavior } from './behavior';

export class PulseBehavior extends Behavior {
  static DURATION = 800;

  static OPACITY_THRESHOLD = 0.1;

  actions = [this.pulse];

  pulsating = false;

  timer!: AnimationTimer;

  constructor(
    public duration: number = PulseBehavior.DURATION,
    public opacityThreshold: number = PulseBehavior.OPACITY_THRESHOLD
  ) {
    super();

    this.timer = new AnimationTimer(this.duration, new EaseInOut());
    this.timers.push(this.timer);
  }

  brighten(sprite: Sprite, elapsed: number) {
    sprite.opacity += this.calRate(elapsed);
  }

  calRate(elapsed: number): number {
    return (1 - this.opacityThreshold) * (elapsed / this.duration);
  }

  dim(sprite: Sprite, elapsed: number) {
    sprite.opacity = 1 - this.calRate(elapsed);
  }

  pulse(sprite: Sprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (!this.pulsating) {
      this.startPulsing();
    } else {
      if (this.timer.isExpired()) {
        this.resetTimer(this.timer);

        return;
      }

      const elapsed = this.timer.getElapsedTime();

      if (elapsed < this.duration) {
        this.dim(sprite, elapsed);
      } else {
        this.brighten(sprite, elapsed);
      }
    }
  }

  startPulsing() {
    this.pulsating = true;
    this.timer.start();
  }
}
