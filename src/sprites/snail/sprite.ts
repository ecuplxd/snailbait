import { PlatformSprite } from 'sprites/platform/sprite';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { SpriteArtist } from 'sprites/artist';
import {
  SNAIL_CELLS,
  SNAIL_CELLS_HEIGHT,
  SNAIL_CELLS_WIDTH,
  SNAIL_PACE_VELOCITY,
} from './data';

export class SnailSprite extends Sprite {
  constructor(public platformSprite: PlatformSprite) {
    super('snail', new SpriteArtist(SpriteSheetResource, SNAIL_CELLS));

    this.width = SNAIL_CELLS_WIDTH;
    this.height = SNAIL_CELLS_HEIGHT;
    this.velocityX = SNAIL_PACE_VELOCITY;

    this.putOnPlatform();
  }

  putOnPlatform() {
    this.top = this.platformSprite.top - this.height;
    this.left = this.platformSprite.left;
  }
}
