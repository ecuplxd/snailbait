import { CycleBehavior } from 'behavior/cycle';
import { SpriteArtist } from 'sprites/artist';
import { SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import {
  BEE_CELLS,
  BEE_CELLS_HEIGHT,
  BEE_CELLS_WIDTH,
  BEE_FLAP_DURATION,
  BEE_FLAP_INTERVAL,
} from './data';

export class BeeSprite extends Sprite {
  constructor(data: SpriteData) {
    super(
      'bee',
      new SpriteArtist(SpriteSheetResource, BEE_CELLS),
      new CycleBehavior(BEE_FLAP_DURATION, BEE_FLAP_INTERVAL)
    );

    this.width = BEE_CELLS_WIDTH;
    this.height = BEE_CELLS_HEIGHT;

    this.setPosition(data);
  }
}
