import { Fps } from 'fps';
import { Sprite } from 'sprites/sprite';
import { Behavior } from './behavior';

export class CycleBehavior extends Behavior {
  actions = [this.cycle];

  constructor(public duration: number = 1000, public interval: number = 500) {
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
