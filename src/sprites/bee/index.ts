import { BEE_DATA } from './data';
import { BeeSprite } from './sprite';

export const BEE_SPRITES = BEE_DATA.map((bee) => new BeeSprite(bee));
