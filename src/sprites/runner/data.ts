import { Cell } from 'sprites/model';

export const RUNNER_CELLS_HEIGHT = 54;

export const RUNNER_HEIGHT = 55;

export const RUN_ANIMATION_RATE = 30;

export const RUNNER_LEFT = 50;

export const STARTING_RUNNER_TRACK = 1;

export const RUNNER_CELLS_RIGHT: Cell[] = [
  new Cell(414, 385, 47, RUNNER_CELLS_HEIGHT),
  new Cell(362, 385, 44, RUNNER_CELLS_HEIGHT),
  new Cell(314, 385, 39, RUNNER_CELLS_HEIGHT),
  new Cell(265, 385, 46, RUNNER_CELLS_HEIGHT),
  new Cell(205, 385, 49, RUNNER_CELLS_HEIGHT),
  new Cell(150, 385, 46, RUNNER_CELLS_HEIGHT),
  new Cell(96, 385, 46, RUNNER_CELLS_HEIGHT),
  new Cell(45, 385, 35, RUNNER_CELLS_HEIGHT),
  new Cell(0, 385, 35, RUNNER_CELLS_HEIGHT),
];

export const RUNNER_CELLS_LEFT = [
  new Cell(0, 305, 47, RUNNER_CELLS_HEIGHT),
  new Cell(55, 305, 44, RUNNER_CELLS_HEIGHT),
  new Cell(107, 305, 39, RUNNER_CELLS_HEIGHT),
  new Cell(152, 305, 46, RUNNER_CELLS_HEIGHT),
  new Cell(208, 305, 49, RUNNER_CELLS_HEIGHT),
  new Cell(265, 305, 46, RUNNER_CELLS_HEIGHT),
  new Cell(320, 305, 42, RUNNER_CELLS_HEIGHT),
  new Cell(380, 305, 35, RUNNER_CELLS_HEIGHT),
  new Cell(425, 305, 35, RUNNER_CELLS_HEIGHT),
];