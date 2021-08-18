import { SAPPHIRE_DATA } from './data';
import { SapphireSprite } from './sprite';

export const SAPPHIRE_SPRITES = SAPPHIRE_DATA.map(
  (sapphire) => new SapphireSprite(sapphire)
);
