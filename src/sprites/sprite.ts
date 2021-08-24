import { Fps } from 'fps';
import { Behavior } from '../behavior/behavior';
import { BombSprite } from './bomb/sprite';
import { CollisionInfo, CollisionMargin } from './collisionMargin';
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

  direction?: number;

  exploding = false;

  height = Sprite.DEFAULT_HEIGHT;

  hOffset = STARTING_SPRITE_OFFSET;

  left = 0;

  opacity = Sprite.DEFAULT_OPACITY;

  showCollisionRectangle = false;

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

  calculateCollisionRectangle(): CollisionInfo {
    const { collisionMargin, left, top, width, height, hOffset } = this;
    const collision = new CollisionInfo();

    collision.left = left - hOffset + collisionMargin.left;
    collision.right = left - hOffset + width - collisionMargin.right;
    collision.top = top + collisionMargin.top;
    collision.bottom =
      top + collisionMargin.top + height - collisionMargin.bottom;
    collision.centerX = left + width / 2;
    collision.centerY = top + height / 2;

    return collision;
  }

  disCollideWidthOtherSprite(
    sprite: Sprite,
    context: CanvasRenderingContext2D
  ) {
    const r = this.calculateCollisionRectangle();
    const o = sprite.calculateCollisionRectangle();

    context.beginPath();
    context.rect(o.left, o.top, o.right - o.left, o.bottom - o.top);

    return (
      context.isPointInPath(r.left, r.top) ||
      context.isPointInPath(r.right, r.top) ||
      context.isPointInPath(r.centerX, r.centerY) ||
      context.isPointInPath(r.left, r.bottom) ||
      context.isPointInPath(r.right, r.bottom)
    );
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();

    context.globalAlpha = this.opacity;

    if (this.visible && this.artist) {
      this.artist.draw(this, context);
    }

    context.restore();
  }

  explode() {}

  hide() {
    this.visible = false;
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

  resetOffset() {
    this.hOffset = 0;
  }

  setPosition(data: SpriteData) {
    this.top = data.top;
    this.left = data.left;
  }

  shouldDidCollide() {
    return this.visible && !this.exploding;
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
