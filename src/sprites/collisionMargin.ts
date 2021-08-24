export class CollisionMargin {
  bottom = 0;
  left = 0;
  right = 0;
  top = 0;

  constructor(
    left: number = 0,
    top: number = 0,
    right: number = 0,
    bottom: number = 0
  ) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
}

export class CollisionInfo extends CollisionMargin {
  centerX!: number;
  centerY!: number;
}
