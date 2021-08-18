import { Cell } from 'sprites/model';

export const BACKGROUND_VELOCITY = 25;

export const BACKGROUND_TOP_IN_SPRITESHEET = 590;

export const BACKGROUND_WIDTH = 1102;

export const BACKGROUND_HEIGHT = 400;

export const BACKGROUND_CELLS: Cell[] = [
  new Cell(
    0,
    BACKGROUND_TOP_IN_SPRITESHEET,
    BACKGROUND_WIDTH,
    BACKGROUND_HEIGHT
  ),
];
