import { SpriteArtist } from 'sprites/artist';
import { Cell, SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { CoinBehavior } from './behavior';
import { COIN_CELLS_WIDTH } from './data';

export class ConinSprite extends Sprite {
  value = 50;

  constructor(data: SpriteData, coinCells: Cell[], behavior: CoinBehavior) {
    super('coin', new SpriteArtist(SpriteSheetResource, coinCells), behavior);

    this.width = COIN_CELLS_WIDTH;
    this.height = COIN_CELLS_WIDTH;

    this.setPosition(data);
  }
}
