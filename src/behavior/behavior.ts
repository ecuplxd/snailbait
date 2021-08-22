import { Fps } from 'fps';
import { TimeStamp } from 'model';
import { Timer } from 'timer/timer';
import { Sprite } from '../sprites/sprite';
import { BehaviorAction } from './model';

export class Behavior<T extends Sprite = Sprite> {
  actions: BehaviorAction<T>[] = [];

  lastAdvanceTime: TimeStamp = 0;

  timers: Timer[] = [];

  advanceArtist(sprite: T, fps: Fps) {
    sprite.artist.advance();

    this.updateLastAdvanceTime(fps);
  }

  combineBehavior(behavior: Behavior, action: BehaviorAction) {
    this.timers = this.timers.concat(behavior.timers);

    return action.bind(behavior);
  }

  execute(sprite: T, fps: Fps, context: CanvasRenderingContext2D): void {
    this.actions.forEach((action) => action.call(this, sprite, fps, context));
  }

  pause() {
    this.timers.forEach((timer) => {
      if (!timer.isPaused()) {
        timer.pause();
      }
    });
  }

  resetTimer(timer: Timer) {
    timer.stop();
    timer.reset();
    timer.start();
  }

  skipFirst() {
    return this.lastAdvanceTime === 0;
  }

  unpause() {
    this.timers.forEach((timer) => {
      if (timer.isPaused()) {
        timer.unpause();
      }
    });
  }

  updateLastAdvanceTime(fps: Fps) {
    this.lastAdvanceTime = fps.currentTime;
  }
}
