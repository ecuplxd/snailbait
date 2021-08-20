import { LEFT, RIGHT } from 'config';
import { SpriteArtist } from 'sprites/artist';
import { Behavior } from 'behavior/behavior';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { calculatePlatformTop } from 'utils';
import { RunnerBehavior } from './behavior';
import {
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

  track = STARTING_RUNNER_TRACK;

  constructor() {
    super(
      'runner',
      new SpriteArtist(SpriteSheetResource, RUNNER_CELLS_RIGHT),
      new RunnerBehavior() as unknown as Behavior
    );

    this.left = RUNNER_LEFT;
    this.top = calculatePlatformTop(this.track) - RUNNER_HEIGHT;
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
