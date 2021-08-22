export abstract class Easing {
  constructor(public strength = 1.0) {}

  abstract cal(percentComplete: number): number;
}

export class EaseOut extends Easing {
  cal(percentComplete: number): number {
    return 1 - Math.pow(1 - percentComplete, this.strength * 2);
  }
}

export class EaseIn extends Easing {
  cal(percentComplete: number): number {
    return Math.pow(percentComplete, this.strength * 2);
  }
}

export class EaseOutIn extends Easing {
  cal(percentComplete: number): number {
    return (
      percentComplete + Math.sin(percentComplete * 2 * Math.PI) / (2 * Math.PI)
    );
  }
}

export class EaseInOut extends Easing {
  cal(percentComplete: number): number {
    return (
      percentComplete - Math.sin(percentComplete * 2 * Math.PI) / (2 * Math.PI)
    );
  }
}
