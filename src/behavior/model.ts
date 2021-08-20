import { Fps } from 'fps';
import { Sprite } from 'sprites/sprite';

export type BehaviorAction<T extends Sprite = Sprite> = (
  sprite: T,
  fps: Fps,
  context: CanvasRenderingContext2D
) => void;
