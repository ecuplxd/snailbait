import { Fps } from 'fps';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { BackgroundArtist } from './artist';
import {
  BACKGROUND_CELLS,
  BACKGROUND_VELOCITY,
  BACKGROUND_WIDTH,
} from './data';

export class BackgroundSprite extends Sprite {
  constructor() {
    super(
      'background',
      new BackgroundArtist(SpriteSheetResource, BACKGROUND_CELLS)
    );
  }

  isInvalidOffset() {
    return this.hOffset < 0 || this.hOffset > BACKGROUND_WIDTH;
  }

  move(fps: Fps) {
    this.hOffset += fps.calCurrentFrameNeedToMovePixel(this.velocityX);

    if (this.isInvalidOffset()) {
      this.resetOffset();
    }
  }

  turnLeft() {
    this.updateVelocityX(-BACKGROUND_VELOCITY);
  }

  turnRight() {
    this.updateVelocityX(BACKGROUND_VELOCITY);
  }
}
