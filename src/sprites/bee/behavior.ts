import { Behavior } from 'behavior/behavior';
import { CellSwitchBehavior } from 'behavior/cellSwitch';
import { CycleBehavior } from 'behavior/cycle';
import { Fps } from 'fps';
import { EXPLOSION_CELLS } from 'sprites/runner/data';
import { Sprite } from 'sprites/sprite';
import {
  BEE_EXPLOSION_DURATION,
  BEE_FLAP_DURATION,
  BEE_FLAP_INTERVAL,
} from './data';

export class BeeBehavior extends Behavior {
  constructor() {
    super();

    const cycle = new CycleBehavior(BEE_FLAP_DURATION, BEE_FLAP_INTERVAL);
    const cellSwitch = new CellSwitchBehavior(
      EXPLOSION_CELLS,
      BEE_EXPLOSION_DURATION,
      this.explodeTrigger,
      this.explodeCallback
    );

    this.actions.push(this.combineBehavior(cycle, cycle.cycle));
    this.actions.push(this.combineBehavior(cellSwitch, cellSwitch.switch));
  }

  explodeCallback(sprite: Sprite, behavior: CellSwitchBehavior) {
    sprite.exploding = false;
  }

  explodeTrigger(sprite: Sprite, fps: Fps) {
    return sprite.exploding;
  }
}
