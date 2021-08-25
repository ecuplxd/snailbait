import { Behavior } from 'behavior/behavior';
import { BehaviorAction } from 'behavior/model';
import { PaceBehavior } from 'behavior/pace';
import { Fps } from 'fps';
import { BUTTON_REBOUND_DELAY, SECOND_BEE_EXPLOSION_DELAY } from './data';
import { ButtonSprite } from './sprite';

export class ButtonBehavior extends Behavior {
  constructor() {
    super();

    const pace = new PaceBehavior();

    this.actions.push(this.combineBehavior(pace, pace.pace as BehaviorAction));
    this.actions.push(this.detonate as any);
  }

  detonate(sprite: ButtonSprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (!sprite.detonating) {
      return;
    }

    const bees = this.getRelateSprites().filter((item) => item.type === 'bee');

    console.log(bees);

    sprite.artist.cellIndex = 1;
    bees[5].explode();

    setTimeout(() => {
      bees[6].explode();
    }, SECOND_BEE_EXPLOSION_DELAY);

    sprite.detonating = false;

    setTimeout(() => {
      sprite.artist.cellIndex = 0;
    }, BUTTON_REBOUND_DELAY);
  }
}
