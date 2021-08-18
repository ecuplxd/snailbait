import { BAT_DATA } from './data';
import { BatSprite } from './sprite';

export const BAT_SPRITES = BAT_DATA.map((bat) => new BatSprite(bat));
