import { CycleBehavior } from 'behavior/cycle';
import {
  BLUE_COIN_CELLS,
  BLUE_THROB_DURATION,
  COIN_DATA,
  GOLD_COIN_CELLS,
  GOLD_THROB_DURATION,
} from './data';
import { ConinSprite } from './sprite';

export const COIN_SPRITES = COIN_DATA.map(
  (coin, i) =>
    new ConinSprite(
      coin,
      i % 2 === 0 ? GOLD_COIN_CELLS : BLUE_COIN_CELLS,
      new CycleBehavior(i % 2 === 0 ? GOLD_THROB_DURATION : BLUE_THROB_DURATION)
    )
);
