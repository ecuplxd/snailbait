import { SpriteArtist } from 'sprites/artist';
import { CollisionMargin } from 'sprites/collisionMargin';
import { SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { BeeBehavior } from './behavior';
import { BEE_CELLS, BEE_CELLS_HEIGHT, BEE_CELLS_WIDTH } from './data';

export class BeeSprite extends Sprite {
  collisionMargin = new CollisionMargin(10, 10, 5, 10);

  constructor(data: SpriteData) {
    super(
      'bee',
      new SpriteArtist(SpriteSheetResource, BEE_CELLS),
      new BeeBehavior()
    );

    this.width = BEE_CELLS_WIDTH;
    this.height = BEE_CELLS_HEIGHT;

    this.setPosition(data);
  }
}
