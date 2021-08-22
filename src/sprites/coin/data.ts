import { TRACK_BASELINES } from 'config';
import { Cell, SpriteData } from 'sprites/model';

export const COIN_CELLS_WIDTH = 30;

export const COIN_CELLS_HEIGHT = 30;

export const GOLD_THROB_DURATION = 500;

export const BLUE_THROB_DURATION = 500;

export const COIN_BOUNCE_DURATION_BASE = 800;

export const COIN_BOUNCE_HEIGHT_BASE = 50;

export const BLUE_COIN_CELLS: Cell[] = [
  new Cell(5, 540, COIN_CELLS_WIDTH, COIN_CELLS_HEIGHT),
  new Cell(5 + COIN_CELLS_WIDTH, 540, COIN_CELLS_WIDTH, COIN_CELLS_HEIGHT),
];

export const GOLD_COIN_CELLS: Cell[] = [
  new Cell(65, 540, COIN_CELLS_WIDTH, COIN_CELLS_HEIGHT),
  new Cell(96, 540, COIN_CELLS_WIDTH, COIN_CELLS_HEIGHT),
  new Cell(128, 540, COIN_CELLS_WIDTH, COIN_CELLS_HEIGHT),
];

export const COIN_DATA: SpriteData[] = [
  new SpriteData(270, TRACK_BASELINES[2] - COIN_CELLS_HEIGHT),
  new SpriteData(489, TRACK_BASELINES[3] - COIN_CELLS_HEIGHT),
  new SpriteData(620, TRACK_BASELINES[1] - COIN_CELLS_HEIGHT),
  new SpriteData(833, TRACK_BASELINES[2] - COIN_CELLS_HEIGHT),
  new SpriteData(1050, TRACK_BASELINES[2] - COIN_CELLS_HEIGHT),
  new SpriteData(1450, TRACK_BASELINES[1] - COIN_CELLS_HEIGHT),
  new SpriteData(1670, TRACK_BASELINES[2] - COIN_CELLS_HEIGHT),
  new SpriteData(1870, TRACK_BASELINES[1] - COIN_CELLS_HEIGHT),
  new SpriteData(1930, TRACK_BASELINES[1] - COIN_CELLS_HEIGHT),
  new SpriteData(2200, TRACK_BASELINES[2] - COIN_CELLS_HEIGHT),
  new SpriteData(2320, TRACK_BASELINES[2] - COIN_CELLS_HEIGHT),
  new SpriteData(2360, TRACK_BASELINES[1] - COIN_CELLS_HEIGHT),
];
