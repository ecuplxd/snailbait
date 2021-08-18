import { singleton } from 'singleton';
import { Artist } from 'sprites/model';
import { calculatePlatformTop } from 'utils';
import { PLATFORM_STROKE_STYLE, PLATFORM_STROKE_WIDTH } from './data';
import { PlatformSprite } from './sprite';

@singleton
export class PlatformArtist extends Artist {
  static strokeStyle = PLATFORM_STROKE_STYLE;

  static strokeWidth = PLATFORM_STROKE_WIDTH;

  draw(sprite: PlatformSprite, context: CanvasRenderingContext2D): void {
    const { track, left, width, height, fillStyle } = sprite;
    const top = calculatePlatformTop(track);

    context.lineWidth = PlatformArtist.strokeWidth;
    context.strokeStyle = PlatformArtist.strokeStyle;
    context.fillStyle = fillStyle;

    context.strokeRect(left, top, width, height);
    context.fillRect(left, top, width, height);
  }
}
