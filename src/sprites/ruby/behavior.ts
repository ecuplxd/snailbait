import { Behavior } from 'behavior/behavior';
import { BounceBehavior } from 'behavior/bounce';
import { CycleBehavior } from 'behavior/cycle';
import { BehaviorAction } from 'behavior/model';
import {
  RUBY_BOUNCE_DURATION_BASE,
  RUBY_BOUNCE_HEIGHT_BASE,
  RUBY_SPARKLE_DURATION,
} from './data';

export class RubyBehavior extends Behavior {
  actions: BehaviorAction[] = [];

  constructor() {
    super();

    const cycle = new CycleBehavior(RUBY_SPARKLE_DURATION);
    const bounce = new BounceBehavior(
      RUBY_BOUNCE_DURATION_BASE + RUBY_BOUNCE_DURATION_BASE * Math.random(),
      (RUBY_BOUNCE_HEIGHT_BASE + RUBY_BOUNCE_HEIGHT_BASE * Math.random()) * 2
    );

    this.actions.push(this.combineBehavior(cycle, cycle.cycle));
    this.actions.push(this.combineBehavior(bounce, bounce.bounce));
  }
}
