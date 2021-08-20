import { TRACK_BASELINES } from 'config';
import { Cell, SpriteData } from 'sprites/model';
import { RUNNER_HEIGHT } from 'sprites/runner/data';

export const RUBY_CELLS_WIDTH = 35;

export const RUBY_CELLS_HEIGHT = 30;

export const RUBY_SPARKLE_DURATION = 100;

export const RUBY_SPARKLE_INTERVAL = 500;

export const RUBY_CELLS: Cell[] = [
  new Cell(3, 138, RUBY_CELLS_WIDTH, RUNNER_HEIGHT),
  new Cell(39, 138, RUBY_CELLS_WIDTH, RUNNER_HEIGHT),
  new Cell(76, 138, RUBY_CELLS_WIDTH, RUNNER_HEIGHT),
  new Cell(112, 138, RUBY_CELLS_WIDTH, RUNNER_HEIGHT),
  new Cell(148, 138, RUBY_CELLS_WIDTH, RUNNER_HEIGHT),
];

export const RUBY_DATA: SpriteData[] = [
  new SpriteData(690, TRACK_BASELINES[1] - RUBY_CELLS_HEIGHT),
  new SpriteData(1700, TRACK_BASELINES[2] - RUBY_CELLS_HEIGHT),
  new SpriteData(2056, TRACK_BASELINES[2] - RUBY_CELLS_HEIGHT),
];
