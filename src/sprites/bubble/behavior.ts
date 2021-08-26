import { Behavior } from 'behavior/behavior';
import { Fps } from 'fps';
import { AnimationTimer } from 'timer/animationTimer';
import { EaseOut } from 'timer/easing';
import { BubbleSprite } from './bubble';
import { DEFAULT_BUBBLE_LIFE_TIME } from './data';

export class BubbleBehavior extends Behavior {
  actions = [this.dissipate] as any[];

  timer = new AnimationTimer(DEFAULT_BUBBLE_LIFE_TIME, new EaseOut(1.5));

  timers = [this.timer];

  constructor() {
    super();
  }

  dissipate(sprite: BubbleSprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (!this.timer.isRunning()) {
      this.timer.start(fps.currentTime);
    } else if (!this.timer.isExpired(fps.currentTime)) {
      sprite.dissipate(
        fps,
        this.timer.getElapsedTime(fps.currentTime),
        this.timer.duration
      );
    } else {
      this.timer.reset();
      sprite.resetBubble(fps.currentTime);
    }
  }
}
