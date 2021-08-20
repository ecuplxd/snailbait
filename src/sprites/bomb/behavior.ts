import { Behavior } from 'behavior/behavior';
import { Fps } from 'fps';
import { SNAIL_BOMB_VELOCITY } from './data';
import { BombSprite } from './sprite';

export class BombBehavior extends Behavior {
  actions = [this.move] as any[];

  move(sprite: BombSprite, fps: Fps, context: CanvasRenderingContext2D) {
    const sRight = sprite.left + sprite.width;

    if (sRight > sprite.hOffset && sRight < sprite.hOffset + sprite.width) {
      sprite.visible = false;
    } else {
      sprite.left -= fps.calCurrentFramePixelsToMove(SNAIL_BOMB_VELOCITY);
    }
  }
}
