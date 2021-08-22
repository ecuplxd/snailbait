import { Fps } from 'fps';
import { Sprite } from 'sprites/sprite';
import { Behavior } from './behavior';

export class CycleBehavior extends Behavior {
  static DURATION = 1000;

  static INTERVAL = 500;

  actions = [this.cycle];

  constructor(
    public duration: number = CycleBehavior.DURATION,
    public interval: number = CycleBehavior.INTERVAL
  ) {
    super();
  }

  cycle(sprite: Sprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (this.skipFirst()) {
      this.updateLastAdvanceTime(fps);
    }

    if (fps.oneFramePassed(this.lastAdvanceTime, this.duration)) {
      this.advanceArtist(sprite, fps);
    } else if (this.interval && sprite.artist.cellIndex === 0) {
      if (fps.oneFramePassed(this.lastAdvanceTime, this.interval)) {
        this.advanceArtist(sprite, fps);
      }
    }
  }
}
