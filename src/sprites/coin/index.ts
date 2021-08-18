import { BLUE_COIN_CELLS, COIN_DATA, GOLD_COIN_CELLS } from './data';
import { ConinSprite } from './sprite';

export const COIN_SPRITES = COIN_DATA.map(
  (coin, i) =>
    new ConinSprite(coin, i % 2 === 0 ? GOLD_COIN_CELLS : BLUE_COIN_CELLS)
);
