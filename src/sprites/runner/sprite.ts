import { Behavior } from 'behavior/behavior';
import { LEFT, RIGHT } from 'config';
import { TimeStamp } from 'model';
import { SpriteArtist } from 'sprites/artist';
import { CollisionMargin } from 'sprites/collisionMargin';
import { PlatformSprite } from 'sprites/platform/sprite';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { calculatePlatformTop } from 'utils';
import { RunnerBehavior } from './behavior';
import {
  JUMP_DURATION,
  JUMP_HEIGHT,
  RUNNER_CELLS_LEFT,
  RUNNER_CELLS_RIGHT,
  RUNNER_HEIGHT,
  RUNNER_LEFT,
  RUNNER_WIDTH,
  RUN_ANIMATION_RATE,
  STARTING_RUNNER_TRACK,
} from './data';

export class RunnerSprite extends Sprite<SpriteArtist> {
  animationRate = RUN_ANIMATION_RATE;

  collisionMargin = new CollisionMargin(20, 15, 15, 20);

  direction = LEFT;

  falling = false;

  height = RUNNER_HEIGHT;

  initialVelocityY = 0;

  // 能跳到的最高高度，到达后将下降
  jumpApex = 0;

  jumpDuration = JUMP_DURATION;

  // 每次跳跃的高度
  jumpHeight = JUMP_HEIGHT;

  jumping = false;

  track = STARTING_RUNNER_TRACK;

  velocityY = 0;

  // 跳跃后到达的位置
  verticalLaunchPosition = 0;

  width = RUNNER_WIDTH;

  constructor() {
    super(
      'runner',
      new SpriteArtist(SpriteSheetResource, RUNNER_CELLS_RIGHT),
      new RunnerBehavior() as unknown as Behavior
    );

    this.left = RUNNER_LEFT;
    this.top = calculatePlatformTop(this.track) - RUNNER_HEIGHT;
  }

  canJump() {
    return this.jumping;
  }

  explode() {
    if (!this.exploding) {
      if (this.animationRate === 0) {
        this.animationRate = RUN_ANIMATION_RATE;
      }

      this.exploding = true;
    }
  }

  fall(now: TimeStamp, initialVelocity: number = 0) {
    const behavior = this.getBehavior();

    this.falling = true;
    this.velocityY = initialVelocity;
    this.initialVelocityY = initialVelocity;

    behavior.fallTimer.start(now);
  }

  getBehavior() {
    return this.behavior as unknown as RunnerBehavior;
  }

  jump(now: TimeStamp) {
    if (this.canJump()) {
      return;
    }

    const behavior = this.getBehavior();

    this.jumping = true;
    this.animationRate = 0;
    this.verticalLaunchPosition = this.top;

    behavior.ascendTimer.start(now);
  }

  loseLife() {
    // this.hide();
  }

  platformUnderneath(track?: number) {
    track = track || this.track;

    const behavior = this.getBehavior();
    const sr = this.calculateCollisionRectangle();
    const platforms = behavior
      .getRelateSprites()
      .filter((sprite) => sprite.type === 'platform');

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < platforms.length; i++) {
      const platform = platforms[i] as PlatformSprite;
      const pr = platform.calculateCollisionRectangle();

      if (track === platform.track) {
        if (sr.right > pr.left && sr.left < pr.right) {
          return platform;
        }
      }
    }

    return;
  }

  putOnTrack(track: number) {
    const SPACE_BETWEEN_SPRITE_AND_TRACK = 2;

    this.track = track;
    this.top =
      calculatePlatformTop(this.track) -
      this.height -
      SPACE_BETWEEN_SPRITE_AND_TRACK;
  }

  reset() {
    this.left = RUNNER_LEFT;
    this.track = 1;
    this.hOffset = 0;
    this.visible = true;
    this.exploding = false;
    this.jumping = false;
    this.falling = false;
    this.top = calculatePlatformTop(3) - this.height;
    this.artist.reset(RUNNER_CELLS_RIGHT);
  }

  stopFalling() {
    const behavior = this.getBehavior();

    this.falling = false;
    this.velocityY = 0;

    behavior.fallTimer.stop(behavior.executeTime);
  }

  stopJumping() {
    const behavior = this.getBehavior();

    behavior.ascendTimer.stop(behavior.executeTime);
    behavior.descendTimer.stop(behavior.executeTime);

    this.animationRate = RUN_ANIMATION_RATE;
    this.jumping = false;
  }

  turnLeft() {
    this.animationRate = RUN_ANIMATION_RATE;
    this.artist.cells = RUNNER_CELLS_LEFT;
    this.direction = LEFT;
  }

  turnRight() {
    this.animationRate = RUN_ANIMATION_RATE;
    this.artist.cells = RUNNER_CELLS_RIGHT;
    this.direction = RIGHT;
  }
}
