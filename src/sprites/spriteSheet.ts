export class SpriteSheet {
  resource = new Image();

  constructor() {
    this.resource.src = 'images/spritesheet.png';
  }
}

export const SpriteSheetResource = new SpriteSheet().resource;
