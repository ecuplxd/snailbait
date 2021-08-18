import { SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { SpriteArtist } from 'sprites/artist';
import { BEE_CELLS, BEE_CELLS_HEIGHT, BEE_CELLS_WIDTH } from './data';

export class BeeSprite extends Sprite {
  constructor(data: SpriteData) {
    super('bee', new SpriteArtist(SpriteSheetResource, BEE_CELLS));

    this.width = BEE_CELLS_WIDTH;
    this.height = BEE_CELLS_HEIGHT;

    this.setPosition(data);
  }
}
