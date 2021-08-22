import { SpriteArtist } from 'sprites/artist';
import { SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { RubyBehavior } from './behavior';
import { RUBY_CELLS, RUBY_CELLS_HEIGHT, RUBY_CELLS_WIDTH } from './data';

export class RubySprite extends Sprite {
  value = 200;

  constructor(data: SpriteData) {
    super(
      'ruby',
      new SpriteArtist(SpriteSheetResource, RUBY_CELLS),
      new RubyBehavior()
    );

    this.width = RUBY_CELLS_WIDTH;
    this.height = RUBY_CELLS_HEIGHT;

    this.setPosition(data);
  }
}
