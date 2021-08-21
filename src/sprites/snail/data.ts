import { Cell } from 'sprites/model';
import { PlatformInfo } from 'sprites/platform/model';

export const SNAIL_CELLS_WIDTH = 64;

export const SNAIL_CELLS_HEIGHT = 34;

export const SNAIL_PACE_VELOCITY = 50;

export const SNAIL_CYCLE_DURATION = 300;

export const SNAIL_CYCLE_INTERVAL = 1500;

export const MOUTH_OPEN_CELL = 2;

export const SNAIL_CELLS: Cell[] = [
  new Cell(143, 466, SNAIL_CELLS_WIDTH, SNAIL_CELLS_HEIGHT),
  new Cell(75, 466, SNAIL_CELLS_WIDTH, SNAIL_CELLS_HEIGHT),
  new Cell(2, 466, SNAIL_CELLS_WIDTH, SNAIL_CELLS_HEIGHT),
];

export const SNAIL_DATA: PlatformInfo[] = [new PlatformInfo(3)];
