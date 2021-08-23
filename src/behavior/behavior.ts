import { Fps } from 'fps';
import { TimeStamp } from 'model';
import { Timer } from 'timer/timer';
import { Sprite } from '../sprites/sprite';
import { BehaviorAction } from './model';

export class Behavior<T extends Sprite = Sprite> {
  actions: BehaviorAction<T>[] = [];

  executeTime!: TimeStamp;

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
    this.updateExecuteTime(fps.currentTime);
    this.actions.forEach((action) => action.call(this, sprite, fps, context));
  }

  pause() {
    this.timers.forEach((timer) => {
      if (!timer.isPaused()) {
        timer.pause(this.executeTime);
      }
    });
  }

  resetTimer(timer: Timer) {
    timer.reboot();
  }

  skipFirst() {
    return this.lastAdvanceTime === 0;
  }

  unpause() {
    this.timers.forEach((timer) => {
      if (timer.isPaused()) {
        timer.unpause(this.executeTime);
      }
    });
  }

  updateExecuteTime(time: TimeStamp) {
    this.executeTime = time;

    return this;
  }

  updateLastAdvanceTime(fps: Fps) {
    this.lastAdvanceTime = fps.currentTime;
  }
}
