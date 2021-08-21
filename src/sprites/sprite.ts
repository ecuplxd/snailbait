import { Fps } from 'fps';
import { StopWatchPair } from 'model';
import { Behavior } from '../behavior/behavior';
import { BombSprite } from './bomb/sprite';
import { CollisionMargin } from './collisionMargin';
import {
  CANVAS_WIDTH,
  STARTING_SPRITE_OFFSET,
  STARTING_SPRITE_VELOCITY,
} from './data';
import { Artist, SpriteData } from './model';

export class Sprite<T extends Artist = Artist> {
  static DEFAULT_HEIGHT = 10;

  static DEFAULT_OPACITY = 1.0;

  static DEFAULT_WIDTH = 10;

  arms: BombSprite[] = [];

  collisionMargin = new CollisionMargin();

  height = Sprite.DEFAULT_HEIGHT;

  hOffset = STARTING_SPRITE_OFFSET;

  left = 0;

  opacity = Sprite.DEFAULT_OPACITY;

  showCollisionRectangle = false;

  timers: StopWatchPair[] = [];

  top = 0;

  velocityX = STARTING_SPRITE_VELOCITY;

  velocityY = STARTING_SPRITE_VELOCITY;

  visible = true;

  width = Sprite.DEFAULT_WIDTH;

  constructor(
    public type: string,
    public artist: T,
    public behavior?: Behavior
  ) {}

  arm(arm: BombSprite) {
    arm.initArm(this);

    this.arms.push(arm);
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();

    context.globalAlpha = this.opacity;

    if (this.visible && this.artist) {
      this.artist.draw(this, context);
    }

    context.restore();
  }

  inView(canvasWidth = CANVAS_WIDTH): boolean {
    if (!this.visible) {
      return false;
    }

    return (
      this.left + this.width > this.hOffset &&
      this.left < this.hOffset + canvasWidth
    );
  }

  move(fps: Fps, velocity: number) {
    this.hOffset += fps.calCurrentFramePixelsToMove(velocity);
  }

  pause() {
    this.timers.forEach((timer) => {
      const [first, second] = timer;

      if (first.isRunning()) {
        first.pause();
      } else if (second.isRunning()) {
        second.pause();
      }
    });
  }

  resetOffset() {
    this.hOffset = 0;
  }

  setPosition(data: SpriteData) {
    this.top = data.top;
    this.left = data.left;
  }

  unpause() {
    this.timers.forEach((timer) => {
      const [first, second] = timer;

      if (first.isRunning()) {
        first.unpause();
      } else if (second.isRunning()) {
        second.unpause();
      }
    });
  }

  update(context: CanvasRenderingContext2D, fps: Fps) {
    if (this.behavior) {
      this.behavior.execute(this, fps, context);
    }
  }

  updateVelocityX(velocity: number) {
    this.velocityX = velocity;

    return this.velocityX;
  }
}
