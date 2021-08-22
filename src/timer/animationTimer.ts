import { TimeStamp } from 'model';
import { Easing } from './easing';
import { Timer } from './timer';

export class AnimationTimer extends Timer {
  constructor(public duration: number = 1000, public easing: Easing) {
    super();
  }

  getElapsedTime(now?: TimeStamp) {
    const elapsedTime = super.getElapsedTime(now);
    const percentComplete = elapsedTime / this.duration;

    if (
      this.easing === undefined ||
      percentComplete === 0 ||
      percentComplete > 1
    ) {
      return elapsedTime;
    }

    return elapsedTime * (this.easing.cal(percentComplete) / percentComplete);
  }

  isExpired(now?: TimeStamp) {
    return this.getElapsedTime(now) > this.duration;
  }
}
