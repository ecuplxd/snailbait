import { Fps } from 'fps';
import { BehaviorAction } from './model';
import { Sprite } from './sprite';

export class Behavior<T extends Sprite = Sprite> {
  actions: BehaviorAction<T>[] = [];

  execute(sprite: T, fps: Fps, context: CanvasRenderingContext2D): void {
    this.actions.forEach((action) => action.call(this, sprite, fps, context));
  }
}
