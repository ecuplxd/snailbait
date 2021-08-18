import { PLATFORM_SPRITES } from 'sprites/platform';
import { BLUE_BUTTON_CELLS, BUTTON_DATA, GOLD_BUTTON_CELLS } from './data';
import { ButtonSprite } from './sprite';

export const BUTTON_SPRITES = BUTTON_DATA.map(
  (button, i) =>
    new ButtonSprite(
      PLATFORM_SPRITES[button.platformIndex],
      i !== BUTTON_DATA.length - 1 ? BLUE_BUTTON_CELLS : GOLD_BUTTON_CELLS
    )
);
