import { Artist } from 'sprites/model';
import { SmokingHoleSprite } from './smoke';

export class SmokingArtist extends Artist {
  draw(sprite: SmokingHoleSprite, context: CanvasRenderingContext2D): void {
    sprite.fireParticles.forEach((fireParticle) =>
      fireParticle.artist.draw(fireParticle, context)
    );
    sprite.smokeBubbleSprites.forEach((smokeBubble) =>
      smokeBubble.artist.draw(smokeBubble, context)
    );
  }
}
