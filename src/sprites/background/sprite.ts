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
    this.hOffset += fps.calCurrentFramePixelsToMove(this.velocityX);

    if (this.isInvalidOffset()) {
      this.resetOffset();
    }
  }

  shake() {
    const NUM_SHAKES = 12;
    const SHAKE_INTERVAL = 80;
    const velocity = BACKGROUND_VELOCITY * 1.5;
    const originalVelocity = this.velocityX;

    let i = 0;

    const reversDirection = () => {
      this.velocityX = i % 2 ? velocity : -velocity;
      if (i < NUM_SHAKES) {
        setTimeout(reversDirection, SHAKE_INTERVAL);
        ++i;
      } else {
        this.velocityX = originalVelocity;
      }
    };

    reversDirection();
  }

  turnLeft() {
    this.updateVelocityX(-BACKGROUND_VELOCITY);
  }

  turnRight() {
    this.updateVelocityX(BACKGROUND_VELOCITY);
  }
}
