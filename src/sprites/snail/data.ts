import { Cell } from 'sprites/model';
import { PlatformInfo } from 'sprites/platform/model';

export const SNAIL_CELLS_WIDTH = 64;

export const SNAIL_CELLS_HEIGHT = 34;

export const SNAIL_PACE_VELOCITY = 0;

export const SNAIL_CELLS: Cell[] = [
  new Cell(143, 466, SNAIL_CELLS_WIDTH, SNAIL_CELLS_HEIGHT),
  new Cell(75, 466, SNAIL_CELLS_WIDTH, SNAIL_CELLS_HEIGHT),
  new Cell(2, 466, SNAIL_CELLS_WIDTH, SNAIL_CELLS_HEIGHT),
];

export const SNAIL_DATA: PlatformInfo[] = [new PlatformInfo(13)];
