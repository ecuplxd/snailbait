import { SpriteArtist } from 'sprites/artist';
import { BACKGROUND_WIDTH } from './data';
import { BackgroundSprite } from './sprite';

export class BackgroundArtist extends SpriteArtist {
  draw(sprite: BackgroundSprite, context: CanvasRenderingContext2D): void {
    context.translate(-sprite.hOffset, 0);

    this.drawImge(context, sprite.left, sprite.top);
    this.drawImge(context, BACKGROUND_WIDTH, sprite.top);

    context.translate(sprite.hOffset, 0);
  }
}
