import { BombSprite } from 'sprites/bomb/sprite';
import { PLATFORM_SPRITES } from 'sprites/platform';
import { SNAIL_DATA } from './data';
import { SnailSprite } from './sprite';

export const SNAIL_SPRITES = SNAIL_DATA.map(
  (snail) =>
    new SnailSprite(PLATFORM_SPRITES[snail.platformIndex], new BombSprite())
);
