import { SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { SpriteArtist } from 'sprites/artist';
import { BAT_CELLS, BAT_CELLS_HEIGHT } from './data';

export class BatSprite extends Sprite {
  constructor(data: SpriteData) {
    super('bat', new SpriteArtist(SpriteSheetResource, BAT_CELLS));

    this.width = BAT_CELLS[1].width;
    this.height = BAT_CELLS_HEIGHT;

    this.setPosition(data);
  }
}
