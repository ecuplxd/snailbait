import { TRACK_BASELINES } from 'config';
import { Cell, SpriteData } from 'sprites/model';

export const BAT_CELLS_HEIGHT = 34;

export const BAT_CELLS: Cell[] = [
  new Cell(3, 0, 36, BAT_CELLS_HEIGHT),
  new Cell(41, 0, 46, BAT_CELLS_HEIGHT),
  new Cell(93, 0, 36, BAT_CELLS_HEIGHT),
  new Cell(132, 0, 46, BAT_CELLS_HEIGHT),
];

export const BAT_RED_EYE_CELLS = [
  new Cell(185, 0, 36, BAT_CELLS_HEIGHT),
  new Cell(222, 0, 46, BAT_CELLS_HEIGHT),
  new Cell(273, 0, 36, BAT_CELLS_HEIGHT),
  new Cell(313, 0, 46, BAT_CELLS_HEIGHT),
];

export const BAT_DATA: SpriteData[] = [
  new SpriteData(85, TRACK_BASELINES[2] - 1.5 * BAT_CELLS_HEIGHT),
  new SpriteData(620, TRACK_BASELINES[3]),
  new SpriteData(904, TRACK_BASELINES[3] - 3 * BAT_CELLS_HEIGHT),
  new SpriteData(1150, TRACK_BASELINES[2] - 3 * BAT_CELLS_HEIGHT),
  new SpriteData(1720, TRACK_BASELINES[2] - 2 * BAT_CELLS_HEIGHT),
  new SpriteData(1960, TRACK_BASELINES[3] - BAT_CELLS_HEIGHT),
  new SpriteData(2200, TRACK_BASELINES[3] - BAT_CELLS_HEIGHT),
  new SpriteData(2380, TRACK_BASELINES[3] - 2 * BAT_CELLS_HEIGHT),
];
