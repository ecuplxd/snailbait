import { Fps } from 'fps';
import { BubbleSprite } from 'sprites/bubble/bubble';
import { FireParticleSprite } from 'sprites/fireParticle/sprite';
import { SpriteData } from 'sprites/model';
import { Sprite } from 'sprites/sprite';
import { SmokingArtist } from './artist';
import { SmokingHoleBehavior } from './behavior';
import {
  FIRE_PARTICLE_COUNT,
  SMOKING_BUBBLE_COUNT,
  SMOKING_HOLE_WIDTH,
} from './data';

export class SmokingHoleSprite extends Sprite {
  fireParticles: Sprite[] = [];

  smokeBubbleCursor = 0;

  smokeBubbleSprites: BubbleSprite[] = [];

  constructor(
    data: SpriteData,
    smokeBubbleCount = SMOKING_BUBBLE_COUNT,
    fireParticleCount = FIRE_PARTICLE_COUNT,
    width = SMOKING_HOLE_WIDTH
  ) {
    super('smoking hole', new SmokingArtist(), new SmokingHoleBehavior());

    this.top = data.top;
    this.left = data.left;
    this.width = width;
    this.height = width;
    this.visible = true;
    this.createFireParticles(fireParticleCount);
    this.createSmokeBubbles(smokeBubbleCount);
  }

  advanceCursor() {
    if (this.smokeBubbleCursor <= this.smokeBubbleSprites.length - 1) {
      ++this.smokeBubbleCursor;
    } else {
      this.smokeBubbleCursor = 0;
    }
  }

  createFireParticles(fireParticleCount: number) {
    for (let i = 0; i < fireParticleCount; i++) {
      const radius = Math.random() * 1.5;
      const offset = Math.random() * (radius * 2);
      const fireParticle =
        i % 2 === 0
          ? new FireParticleSprite(
              this.left + offset,
              this.top - offset,
              radius
            )
          : new FireParticleSprite(
              this.left - offset,
              this.top + offset,
              radius
            );

      this.fireParticles.push(fireParticle);
    }
  }

  createSmokeBubbles(smokeBubbleCount: number) {
    for (let i = 0; i < smokeBubbleCount; i++) {
      const smokeBubble =
        i % 2 === 0
          ? new BubbleSprite(
              this.left + Math.random() * 3,
              this.top - Math.random() * 3,
              1,
              Math.random() * 8,
              Math.random() * 5
            )
          : new BubbleSprite(
              this.left + Math.random() * 10,
              this.top - Math.random() * 6,
              1,
              Math.random() * 8,
              Math.random() * 5
            );

      smokeBubble.setColor(i);

      if (i < 10) {
        smokeBubble.dissipatesSlowly = true;
      }

      this.smokeBubbleSprites.push(smokeBubble);
    }
  }

  hasMoreSmokeBubbles() {
    return this.smokeBubbleCursor !== this.smokeBubbleSprites.length - 1;
  }

  move(fps: Fps, bgOffset: number) {
    this.hOffset = bgOffset;
  }

  update(context: CanvasRenderingContext2D, fps: Fps) {
    this.behavior?.execute(this, fps, context);
    this.smokeBubbleSprites.forEach((smokeBubbleSprite) =>
      smokeBubbleSprite.update(context, fps)
    );
  }
}
