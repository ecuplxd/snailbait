import { Behavior } from 'behavior/behavior';
import { Fps } from 'fps';
import { SmokingHoleSprite } from './smoke';

export class SmokingHoleBehavior extends Behavior {
  actions = [this.emit] as any[];

  constructor() {
    super();
  }

  emit(sprite: SmokingHoleSprite, fps: Fps, context: CanvasRenderingContext2D) {
    if (sprite.hasMoreSmokeBubbles()) {
      sprite.smokeBubbleSprites[sprite.smokeBubbleCursor].show();
      sprite.advanceCursor();
    }
  }
}
