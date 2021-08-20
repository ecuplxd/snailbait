import { Fps } from 'fps';
import { TimeStamp } from 'model';
import { Sprite } from '../sprites/sprite';
import { BehaviorAction } from './model';

export class Behavior<T extends Sprite = Sprite> {
  actions: BehaviorAction<T>[] = [];

  lastAdvanceTime: TimeStamp = 0;

  advanceArtist(sprite: T, fps: Fps) {
    sprite.artist.advance();

    this.updateLastAdvanceTime(fps);
  }

  combineBehavior(behavior: Behavior, action: BehaviorAction) {
    return action.bind(behavior);
  }

  execute(sprite: T, fps: Fps, context: CanvasRenderingContext2D): void {
    this.actions.forEach((action) => action.call(this, sprite, fps, context));
  }

  skipFirst() {
    return this.lastAdvanceTime === 0;
  }

  updateLastAdvanceTime(fps: Fps) {
    this.lastAdvanceTime = fps.currentTime;
  }
}
