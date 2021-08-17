import {
  STARTING_BACKGROUND_OFFSET,
  STARTING_BACKGROUND_VELOCITY,
} from 'config';
import { fps } from 'fps';
import { TimeStamp } from 'model';
import { calCurrentFrameNeedToMovePixel } from 'utils';

export class BackgroundSprite {
  image = new Image();

  offset = STARTING_BACKGROUND_OFFSET;

  velocity = STARTING_BACKGROUND_VELOCITY;

  constructor() {
    this.image.src = '../../images/background.png';
  }

  move(now: TimeStamp) {
    this.offset += calCurrentFrameNeedToMovePixel(
      now,
      fps.lastAnimationFrameTime,
      this.velocity
    );

    if (this.isInvalidOffset()) {
      this.resetOffset();
    }
  }

  isInvalidOffset() {
    return this.offset < 0 || this.offset > this.image.width;
  }

  resetOffset() {
    this.offset = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    context.translate(-this.offset, 0);

    context.drawImage(this.image, 0, 0);

    context.drawImage(this.image, this.image.width, 0);

    context.translate(this.offset, 0);
  }
}
