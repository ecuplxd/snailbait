import { TRACK_BASELINES } from 'config';
import { SpriteData } from 'sprites/model';

export const SMOKING_BUBBLE_COUNT = 20;

export const FIRE_PARTICLE_COUNT = 3;

export const SMOKING_HOLE_WIDTH = 20;

export const SMOKING_HOLE_DATA = [
  new SpriteData(250, TRACK_BASELINES[2] - 20),
  new SpriteData(850, TRACK_BASELINES[2] - 20),
];
