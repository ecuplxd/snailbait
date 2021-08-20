import { LEFT, RIGHT } from 'config';
import { Fps } from 'fps';
import { SpriteWithPlatform } from 'sprites/model';
import { Behavior } from './behavior';

export class PaceBehavior extends Behavior {
  actions = [this.pace] as any[];

  pace(
    sprite: SpriteWithPlatform,
    fps: Fps,
    context: CanvasRenderingContext2D
  ) {
    this.setDirection(sprite);
    this.setPosition(sprite, fps);
  }

  setDirection(sprite: SpriteWithPlatform) {
    const sRight = sprite.left + sprite.width;
    const pRight = sprite.platformSprite.left + sprite.platformSprite.width;

    if (sprite.direction === undefined) {
      sprite.direction = RIGHT;
    }

    if (sRight > pRight && sprite.direction === RIGHT) {
      sprite.direction = LEFT;
    } else if (
      sprite.left < sprite.platformSprite.left &&
      sprite.direction === LEFT
    ) {
      sprite.direction = RIGHT;
    }
  }

  setPosition(sprite: SpriteWithPlatform, fps: Fps) {
    const pixelsToMove = fps.calCurrentFramePixelsToMove(sprite.velocityX);

    if (sprite.direction === RIGHT) {
      sprite.left += pixelsToMove;
    } else {
      sprite.left -= pixelsToMove;
    }
  }
}
