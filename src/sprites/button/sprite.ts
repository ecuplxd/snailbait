import { SpriteArtist } from 'sprites/artist';
import { Cell } from 'sprites/model';
import { PlatformSprite } from 'sprites/platform/sprite';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { ButtonBehavior } from './behavior';
import {
  BUTTON_CELLS_HEIGHT,
  BUTTON_CELLS_WIDTH,
  BUTTON_PACE_VELOCITY,
} from './data';

export class ButtonSprite extends Sprite<SpriteArtist> {
  detonating = false;

  direction!: number;

  constructor(public platformSprite: PlatformSprite, buttonCells: Cell[]) {
    super(
      'button',
      new SpriteArtist(SpriteSheetResource, buttonCells),
      new ButtonBehavior()
    );

    this.width = BUTTON_CELLS_WIDTH;
    this.height = BUTTON_CELLS_HEIGHT;
    this.velocityX = BUTTON_PACE_VELOCITY;

    this.putOnPlatform();
  }

  putOnPlatform() {
    this.top = this.platformSprite.top - this.height;
    this.left = this.platformSprite.left;
  }
}
