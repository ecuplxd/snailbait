import { Behavior } from 'behavior/behavior';
import { BounceBehavior } from 'behavior/bounce';
import { CycleBehavior } from 'behavior/cycle';
import { BehaviorAction } from 'behavior/model';
import {
  SAPPHIRE_BOUNCE_DURATION_BASE,
  SAPPHIRE_BOUNCE_HEIGHT_BASE,
  SAPPHIRE_SPARKLE_DURATION,
} from './data';

export class SapphireBehavior extends Behavior {
  actions: BehaviorAction[] = [];

  constructor() {
    super();

    const cycle = new CycleBehavior(SAPPHIRE_SPARKLE_DURATION);
    const bounce = new BounceBehavior(
      SAPPHIRE_BOUNCE_DURATION_BASE +
        SAPPHIRE_BOUNCE_DURATION_BASE * Math.random(),
      (SAPPHIRE_BOUNCE_HEIGHT_BASE +
        SAPPHIRE_BOUNCE_HEIGHT_BASE * Math.random()) *
        2
    );

    this.actions.push(this.combineBehavior(cycle, cycle.cycle));
    this.actions.push(this.combineBehavior(bounce, bounce.bounce));
  }
}
