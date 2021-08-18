import { RUBY_DATA } from './data';
import { RubySprite } from './sprite';

export const RUBY_SPRITES = RUBY_DATA.map((ruby) => new RubySprite(ruby));
