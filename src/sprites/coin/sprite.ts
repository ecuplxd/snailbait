import { Cell, SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { SpriteArtist } from 'sprites/artist';
import { COIN_CELLS_WIDTH } from './data';

export class ConinSprite extends Sprite {
  value = 50;

  constructor(data: SpriteData, coinCells: Cell[]) {
    super('coin', new SpriteArtist(SpriteSheetResource, coinCells));

    this.width = COIN_CELLS_WIDTH;
    this.height = COIN_CELLS_WIDTH;

    this.setPosition(data);
  }
}
