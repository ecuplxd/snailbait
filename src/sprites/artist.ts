import { Artist, Cell } from './model';
import { Sprite } from './sprite';

export class SpriteArtist extends Artist {
  cellIndex = 0;

  constructor(public spritesheet: HTMLImageElement, public cells: Cell[]) {
    super();
  }

  advance() {
    if (this.cellIndex === this.cells.length - 1) {
      this.cellIndex = 0;
    } else {
      this.cellIndex++;
    }
  }

  draw(sprite: Sprite, context: CanvasRenderingContext2D) {
    this.drawImge(context, sprite.left, sprite.top);
  }

  drawImge(context: CanvasRenderingContext2D, left: number, top: number) {
    const cell = this.cells[this.cellIndex];

    context.drawImage(
      this.spritesheet,
      cell.left,
      cell.top,
      cell.width,
      cell.height,
      left,
      top,
      cell.width,
      cell.height
    );
  }
}
