import { Fps } from 'fps';
import { Sprite } from './sprite';

export class Cell {
  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number
  ) {}
}

export class SpriteData {
  constructor(public left: number, public top: number) {}
}

export abstract class Artist {
  cells: Cell[] = [];

  advance() {}

  abstract draw(sprite: Sprite, context: CanvasRenderingContext2D): void;
}

export type BehaviorAction<T extends Sprite = Sprite> = (
  sprite: T,
  fps: Fps,
  context: CanvasRenderingContext2D
) => void;
