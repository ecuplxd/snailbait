import { Fps } from 'fps';
import { TimeStamp } from 'model';
import { Cell } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { Behavior } from './behavior';

export class CellSwitchBehavior extends Behavior {
  actions = [this.switch];

  constructor(
    public cells: Cell[] = [],
    public duration: number = 1000,
    public trigger?: (sprite: Sprite, fps: Fps) => boolean,
    public callback?: (sprite: Sprite, behavior: CellSwitchBehavior) => void
  ) {
    super();
  }

  revert(sprite: Sprite, now: TimeStamp) {
    sprite.artist.revert();

    if (this.callback) {
      this.callback(sprite, this);
    }
  }

  switch(sprite: Sprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (this.trigger && this.trigger(sprite, fps)) {
      if (sprite.artist.cells !== this.cells) {
        this.switchCells(sprite, fps.currentTime);
      } else if (fps.currentTime - sprite.switchStartTime > this.duration) {
        this.revert(sprite, fps.currentTime);
      }
    }
  }

  switchCells(sprite: Sprite, now: TimeStamp) {
    sprite.artist.backup(this.cells);
    sprite.switchStartTime = now;
  }
}
