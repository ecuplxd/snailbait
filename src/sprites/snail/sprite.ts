import { SpriteArtist } from 'sprites/artist';
import { BombSprite } from 'sprites/bomb/sprite';
import { PlatformSprite } from 'sprites/platform/sprite';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { SnailBehavior } from './behavior';
import {
  SNAIL_CELLS,
  SNAIL_CELLS_HEIGHT,
  SNAIL_CELLS_WIDTH,
  SNAIL_PACE_VELOCITY,
} from './data';

export class SnailSprite extends Sprite {
  direction!: number;

  constructor(public platformSprite: PlatformSprite, bomb: BombSprite) {
    super(
      'snail',
      new SpriteArtist(SpriteSheetResource, SNAIL_CELLS),
      new SnailBehavior()
    );

    this.width = SNAIL_CELLS_WIDTH;
    this.height = SNAIL_CELLS_HEIGHT;
    this.velocityX = SNAIL_PACE_VELOCITY;

    this.putOnPlatform();
    this.arm(bomb);
  }

  putOnPlatform() {
    this.top = this.platformSprite.top - this.height;
    this.left = this.platformSprite.left;
  }
}
