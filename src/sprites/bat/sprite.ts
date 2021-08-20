import { CycleBehavior } from 'behavior/cycle';
import { SpriteArtist } from 'sprites/artist';
import { SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import {
  BAT_CELLS,
  BAT_CELLS_HEIGHT,
  BAT_FLAP_DURATION,
  BAT_FLAP_INTERVAL,
} from './data';

export class BatSprite extends Sprite {
  constructor(data: SpriteData) {
    super(
      'bat',
      new SpriteArtist(SpriteSheetResource, BAT_CELLS),
      new CycleBehavior(BAT_FLAP_DURATION, BAT_FLAP_INTERVAL)
    );

    this.width = BAT_CELLS[1].width;
    this.height = BAT_CELLS_HEIGHT;

    this.setPosition(data);
  }
}
