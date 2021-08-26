import { Artist } from 'sprites/model';
import { YELLOW_PREAMBLE } from './data';
import { FireParticleSprite } from './sprite';

export class FireParticleArtist extends Artist {
  constructor(left: number, top: number, radius: number) {
    super();
  }

  draw(sprite: FireParticleSprite, context: CanvasRenderingContext2D): void {
    context.save();

    context.beginPath();
    context.fillStyle = YELLOW_PREAMBLE + Math.random().toFixed(2) + ');';
    context.arc(
      sprite.left,
      sprite.top,
      sprite.radius * 1.5,
      0,
      Math.PI * 2,
      false
    );
    context.fill();

    context.restore();
  }
}
