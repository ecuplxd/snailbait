import { Fps } from 'fps';
import { Behavior } from './behavior';
import { CollisionMargin } from './collisionMargin';
import { STARTING_SPRITE_OFFSET, STARTING_SPRITE_VELOCITY } from './data';
import { Artist, SpriteData } from './model';
import { PLATFORM_VELOCITY_MULTIPLIER } from './platform/data';

export class Sprite<T extends Artist = Artist> {
  static DEFAULT_HEIGHT = 10;

  static DEFAULT_OPACITY = 1.0;

  static DEFAULT_WIDTH = 10;

  collisionMargin = new CollisionMargin();

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

  draw(context: CanvasRenderingContext2D) {
    context.save();

    context.globalAlpha = this.opacity;

    if (this.visible && this.artist) {
      this.artist.draw(this, context);
    }

    context.restore();
  }

  inView(canvasWidth: number): boolean {
    if (!this.visible) {
      return false;
    }

    return (
      this.left + this.width > this.hOffset &&
      this.left < this.hOffset + canvasWidth
    );
  }

  move(fps: Fps, relativeVelocity: number) {
    let velocity = relativeVelocity * PLATFORM_VELOCITY_MULTIPLIER;

    velocity = this.updateVelocityX(velocity);

    this.hOffset += fps.calCurrentFrameNeedToMovePixel(velocity);
  }

  resetOffset() {
    this.hOffset = 0;
  }

  setPosition(data: SpriteData) {
    this.top = data.top;
    this.left = data.left;
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
