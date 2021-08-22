import { Behavior } from 'behavior/behavior';
import { BounceBehavior } from 'behavior/bounce';
import { CycleBehavior } from 'behavior/cycle';
import { BehaviorAction } from 'behavior/model';
import { COIN_BOUNCE_DURATION_BASE, COIN_BOUNCE_HEIGHT_BASE } from './data';

export class CoinBehavior extends Behavior {
  actions: BehaviorAction[] = [];

  constructor(throbDuration: number) {
    super();

    const bounce = new BounceBehavior(
      COIN_BOUNCE_DURATION_BASE + COIN_BOUNCE_DURATION_BASE * Math.random(),
      (COIN_BOUNCE_HEIGHT_BASE + COIN_BOUNCE_HEIGHT_BASE * Math.random()) * 2
    );
    const cycle = new CycleBehavior(throbDuration);

    this.actions.push(this.combineBehavior(bounce, bounce.bounce));
    this.actions.push(this.combineBehavior(cycle, cycle.cycle));
  }
}
