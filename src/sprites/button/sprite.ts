import { PlatformSprite } from 'sprites/platform/sprite';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { SpriteArtist } from 'sprites/artist';
import { BUTTON_CELLS_HEIGHT, BUTTON_CELLS_WIDTH } from './data';
import { Cell } from 'sprites/model';

export class ButtonSprite extends Sprite {
  constructor(public platformSprite: PlatformSprite, buttonCells: Cell[]) {
    super('button', new SpriteArtist(SpriteSheetResource, buttonCells));

    this.width = BUTTON_CELLS_WIDTH;
    this.height = BUTTON_CELLS_HEIGHT;

    this.putOnPlatform();
  }

  putOnPlatform() {
    this.top = this.platformSprite.top - this.height;
    this.left = this.platformSprite.left;
  }
}
