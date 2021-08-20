import { ButtonSprite } from './button/sprite';
import { SnailSprite } from './snail/sprite';
import { Sprite } from './sprite';

export type SpriteWithPlatform = ButtonSprite | SnailSprite;

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
  cellIndex!: number;

  cells: Cell[] = [];

  advance() {}

  abstract draw(sprite: Sprite, context: CanvasRenderingContext2D): void;
}
