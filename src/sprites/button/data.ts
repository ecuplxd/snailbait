import { Cell } from 'sprites/model';
import { PlatformInfo } from 'sprites/platform/model';

export const BUTTON_CELLS_WIDTH = 31;

export const BUTTON_CELLS_HEIGHT = 20;

export const BLUE_BUTTON_CELLS: Cell[] = [
  new Cell(10, 192, BUTTON_CELLS_WIDTH, BUTTON_CELLS_HEIGHT),
  new Cell(53, 192, BUTTON_CELLS_WIDTH, BUTTON_CELLS_HEIGHT),
];

export const GOLD_BUTTON_CELLS: Cell[] = [
  new Cell(90, 190, BUTTON_CELLS_WIDTH, BUTTON_CELLS_HEIGHT),
  new Cell(132, 190, BUTTON_CELLS_WIDTH, BUTTON_CELLS_HEIGHT),
];

export const BUTTON_DATA: PlatformInfo[] = [
  new PlatformInfo(7),
  new PlatformInfo(12),
];
