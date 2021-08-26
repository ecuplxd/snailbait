import { Fps } from 'fps';
import { TimeStamp } from 'model';
import { Sprite } from 'sprites/sprite';
import { BubbleArtist } from './artist';
import { BubbleBehavior } from './behavior';

export class BubbleSprite extends Sprite<BubbleArtist> {
  dissipatesSlowly = false;

  fillStyle!: string;

  originalLeft!: number;

  originalRadius!: number;

  originalTop!: number;

  radius!: number;

  constructor(
    left: number,
    top: number,
    radius: number,
    velocityX: number,
    velocityY: number
  ) {
    super('bubble', new BubbleArtist(), new BubbleBehavior());

    this.left = left;
    this.top = top;
    this.radius = radius;

    this.originalLeft = left;
    this.originalRadius = top;
    this.originalTop = radius;

    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  dissipate(fps: Fps, elapsedTime: number, duration: number) {
    this.left += fps.calCurrentFramePixelsToMove(this.velocityX);
    this.top -= fps.calCurrentFramePixelsToMove(this.velocityY);
    this.opacity = 1 - elapsedTime / duration;

    if (this.dissipatesSlowly) {
      this.radius += fps.calCurrentFramePixelsToMove(10);
    } else {
      this.radius += fps.calCurrentFramePixelsToMove(15);
    }
  }

  resetBubble(now: TimeStamp) {
    this.opacity = 1;
    this.left = this.originalLeft;
    this.top = this.originalTop;
    this.radius = this.originalRadius;
    this.velocityX = Math.random() * 8;
    this.velocityY = Math.random() * 16;
    this.opacity = 0;
  }

  setColor(i: number) {
    const ORANGE = 'rgba(255,104,31,0.3)';
    const YELLOW = 'rgba(255,255,0,0.3)';
    const BLACK = 'rgba(0,0,0,0.5)';

    if (i <= 5) {
      this.fillStyle = BLACK;
    } else if (i <= 8) {
      this.fillStyle = YELLOW;
    } else if (i <= 10) {
      this.fillStyle = ORANGE;
    } else {
      const r = (220 + Math.random() * 35).toFixed(2);
      const g = (220 + Math.random() * 35).toFixed(2);
      const b = (220 + Math.random() * 35).toFixed(2);

      this.fillStyle = `rgb(${r},${g},${b})`;
    }
  }
}
