import { SpriteArtist } from 'sprites/artist';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { BombBehavior } from './behavior';
import {
  BOMB_CELLS,
  SNAIL_BOMB_CELLS_HEIGHT,
  SNAIL_BOMB_CELLS_WIDTH,
} from './data';

export class BombSprite extends Sprite {
  ownerSprite!: Sprite;

  constructor() {
    super(
      'snail bomb',
      new SpriteArtist(SpriteSheetResource, BOMB_CELLS),
      new BombBehavior()
    );

    this.width = SNAIL_BOMB_CELLS_WIDTH;
    this.height = SNAIL_BOMB_CELLS_HEIGHT;
  }

  initArm(sprite: Sprite) {
    this.top = sprite.top + this.height / 2;
    this.left = sprite.left + this.width / 2;
    this.visible = false;
    this.ownerSprite = sprite;
  }
}
