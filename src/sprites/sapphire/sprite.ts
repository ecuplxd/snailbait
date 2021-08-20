import { CycleBehavior } from 'behavior/cycle';
import { SpriteArtist } from 'sprites/artist';
import { SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import {
  SAPPHIRE_CELLS,
  SAPPHIRE_CELLS_HEIGHT,
  SAPPHIRE_CELLS_WIDTH,
  SAPPHIRE_SPARKLE_DURATION,
  SAPPHIRE_SPARKLE_INTERVAL,
} from './data';

export class SapphireSprite extends Sprite {
  value = 100;

  constructor(data: SpriteData) {
    super(
      'sapphire',
      new SpriteArtist(SpriteSheetResource, SAPPHIRE_CELLS),
      new CycleBehavior(SAPPHIRE_SPARKLE_DURATION, SAPPHIRE_SPARKLE_INTERVAL)
    );

    this.width = SAPPHIRE_CELLS_WIDTH;
    this.height = SAPPHIRE_CELLS_HEIGHT;

    this.setPosition(data);
  }
}
