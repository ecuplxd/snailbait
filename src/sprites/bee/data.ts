import { TRACK_BASELINES } from 'config';
import { Cell, SpriteData } from 'sprites/model';

export const BEE_CELLS_WIDTH = 50;

export const BAT_CELLS_HEIGHT = 34;

export const BEE_CELLS_HEIGHT = 50;

export const BEE_FLAP_DURATION = 100;

export const BEE_FLAP_INTERVAL = 30;

export const BEE_CELLS: Cell[] = [
  new Cell(5, 234, BEE_CELLS_WIDTH, BEE_CELLS_HEIGHT),
  new Cell(75, 234, BEE_CELLS_WIDTH, BEE_CELLS_HEIGHT),
  new Cell(145, 234, BEE_CELLS_WIDTH, BEE_CELLS_HEIGHT),
];

export const BEE_DATA: SpriteData[] = [
  new SpriteData(200, TRACK_BASELINES[1] - BEE_CELLS_HEIGHT * 1.5),
  new SpriteData(350, TRACK_BASELINES[2] - BEE_CELLS_HEIGHT * 1.5),
  new SpriteData(550, TRACK_BASELINES[1] - BEE_CELLS_HEIGHT),
  new SpriteData(750, TRACK_BASELINES[1] - BEE_CELLS_HEIGHT * 1.5),
  new SpriteData(924, TRACK_BASELINES[2] - BEE_CELLS_HEIGHT * 1.75),
  new SpriteData(1500, 225),
  new SpriteData(1600, 115),
  new SpriteData(2225, 125),
  new SpriteData(2295, 275),
  new SpriteData(2450, 275),
];
