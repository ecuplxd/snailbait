import { PulseBehavior } from 'behavior/pulse';
import { Sprite } from 'sprites/sprite';
import { calculatePlatformTop } from 'utils';
import { PlatformArtist } from './artist';
import { PLATFORM_STROKE_STYLE, PLATFORM_STROKE_WIDTH } from './data';
import { PlatformData } from './model';

export class PlatformSprite extends Sprite<PlatformArtist> {
  static strokeStyle = PLATFORM_STROKE_STYLE;

  static strokeWidth = PLATFORM_STROKE_WIDTH;

  fillStyle!: string;

  pulsate?: boolean;

  snail?: boolean;

  track = 1;

  constructor(data: PlatformData) {
    super('platform', new PlatformArtist(), new PulseBehavior());

    this.left = data.left;
    this.width = data.width;
    this.height = data.height;
    this.fillStyle = data.fillStyle;
    this.opacity = data.opacity;
    this.track = data.track;
    this.pulsate = data.pulsate;
    this.snail = data.snail;

    this.top = calculatePlatformTop(data.track);
  }

  reset() {
    this.hOffset = 0;
  }
}
