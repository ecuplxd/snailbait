import { SMOKING_HOLE_DATA } from './data';
import { SmokingHoleSprite } from './smoke';

export const SMOKING_HOLE_SPRITES = SMOKING_HOLE_DATA.map(
  (hold) => new SmokingHoleSprite(hold)
);
