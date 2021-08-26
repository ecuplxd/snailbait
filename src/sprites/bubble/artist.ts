import { Artist } from 'sprites/model';
import { BubbleSprite } from './bubble';

export class BubbleArtist extends Artist {
  draw(sprite: BubbleSprite, context: CanvasRenderingContext2D): void {
    if (sprite.radius > 0) {
      context.save();

      context.beginPath();
      context.fillStyle = sprite.fillStyle;
      context.arc(
        sprite.left,
        sprite.top,
        sprite.radius,
        0,
        Math.PI * 2,
        false
      );
      context.fill();

      context.restore();
    }
  }
}
