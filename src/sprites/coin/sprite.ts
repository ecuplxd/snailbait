import { Cell, SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { SpriteArtist } from 'sprites/artist';
import { COIN_CELLS_WIDTH } from './data';
import { Behavior } from 'behavior/behavior';

export class ConinSprite extends Sprite {
  value = 50;

  constructor(data: SpriteData, coinCells: Cell[], behavior: Behavior) {
    super('coin', new SpriteArtist(SpriteSheetResource, coinCells), behavior);

    this.width = COIN_CELLS_WIDTH;
    this.height = COIN_CELLS_WIDTH;

    this.setPosition(data);
  }
}
