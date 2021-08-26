import { Sprite } from 'sprites/sprite';
import { FireParticleArtist } from './artist';

export class FireParticleSprite extends Sprite<FireParticleArtist> {
  radius!: number;

  constructor(left: number, top: number, radius: number) {
    super('fire particle', new FireParticleArtist(left, top, radius));

    this.left = left;
    this.top = top;
    this.radius = radius;
    this.visible = true;
  }
}
