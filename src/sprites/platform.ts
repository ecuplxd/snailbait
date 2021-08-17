import {
  PLATFORM_STROKE_STYLE,
  PLATFORM_STROKE_WIDTH,
  PLATFORM_VELOCITY_MULTIPLIER,
  STARTING_PLATFORM_OFFSET,
} from 'config';
import { fps } from 'fps';
import { PlatformData, TimeStamp } from 'model';
import { calculatePlatformTop, calCurrentFrameNeedToMovePixel } from 'utils';
import { platformData } from './platformData';

export class PlatformSprite {
  static strokeWidth = PLATFORM_STROKE_WIDTH;

  static strokeStyle = PLATFORM_STROKE_STYLE;

  offset = STARTING_PLATFORM_OFFSET;

  velocity = 0;

  move(now: TimeStamp, relativeVelocity: number) {
    this.velocity = relativeVelocity * PLATFORM_VELOCITY_MULTIPLIER;
    this.offset += calCurrentFrameNeedToMovePixel(
      now,
      fps.lastAnimationFrameTime,
      this.velocity
    );
  }

  draw(context: CanvasRenderingContext2D) {
    context.translate(-this.offset, 0);

    platformData.forEach((data) => new PlatformItemSprite(data).draw(context));

    context.translate(this.offset, 0);
  }
}

export class PlatformItemSprite {
  constructor(public platform: PlatformData) {}

  draw(context: CanvasRenderingContext2D) {
    const { track, left, width, height, fillStyle, opacity } = this.platform;
    const platformTop = calculatePlatformTop(track);

    context.lineWidth = PlatformSprite.strokeWidth;
    context.strokeStyle = PlatformSprite.strokeStyle;
    context.fillStyle = fillStyle;
    context.globalAlpha = opacity;

    context.strokeRect(left, platformTop, width, height);
    context.fillRect(left, platformTop, width, height);
  }
}
