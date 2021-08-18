import { PLATFORM_DATA } from './data';
import { PlatformSprite } from './sprite';

export const PLATFORM_SPRITES = PLATFORM_DATA.map(
  (platform) => new PlatformSprite(platform)
);
