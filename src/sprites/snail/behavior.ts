import { Behavior } from 'behavior/behavior';
import { CycleBehavior } from 'behavior/cycle';
import { BehaviorAction } from 'behavior/model';
import { PaceBehavior } from 'behavior/pace';
import { Fps } from 'fps';
import {
  MOUTH_OPEN_CELL,
  SNAIL_CYCLE_DURATION,
  SNAIL_CYCLE_INTERVAL,
} from './data';
import { SnailSprite } from './sprite';

export class SnailBehavior extends Behavior {
  actions: BehaviorAction[] = [];

  constructor() {
    super();

    const pace = new PaceBehavior();
    const cycle = new CycleBehavior(SNAIL_CYCLE_DURATION, SNAIL_CYCLE_INTERVAL);

    this.actions.push(this.combineBehavior(pace, pace.pace as BehaviorAction));
    this.actions.push(this.shoot as any);
    this.actions.push(this.combineBehavior(cycle, cycle.cycle));
  }

  shoot(sprite: SnailSprite, fps: Fps, context: CanvasRenderingContext2D) {
    const bomb = sprite.arms[0];

    if (!sprite.inView()) {
      return;
    }

    if (!bomb.visible && sprite.artist.cellIndex === MOUTH_OPEN_CELL) {
      bomb.left = sprite.left;
      bomb.visible = true;
    }
  }
}
