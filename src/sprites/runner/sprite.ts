import { Behavior } from 'behavior/behavior';
import { LEFT, RIGHT } from 'config';
import { TimeStamp } from 'model';
import { SpriteArtist } from 'sprites/artist';
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
  RUN_ANIMATION_RATE,
  STARTING_RUNNER_TRACK,
} from './data';

export class RunnerSprite extends Sprite<SpriteArtist> {
  animationRate = RUN_ANIMATION_RATE;

  direction = LEFT;

  // 能跳到的最高高度，到达后将下降
  jumpApex = 0;

  jumpDuration = JUMP_DURATION;

  // 每次跳跃的高度
  jumpHeight = JUMP_HEIGHT;

  jumping = false;

  track = STARTING_RUNNER_TRACK;

  // 跳跃后到达的位置
  verticalLaunchPosition = 0;

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
    return this.track !== 3 && this.jumping;
  }

  jump(now: TimeStamp) {
    if (this.jumping) {
      return;
    }

    this.jumping = true;
    this.animationRate = 0;
    this.verticalLaunchPosition = this.top;
    (this.behavior as unknown as RunnerBehavior).ascendTimer.start(now);
  }

  stopJumping() {
    this.jumping = false;
    (this.behavior as unknown as RunnerBehavior).descendTimer.stop();
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
