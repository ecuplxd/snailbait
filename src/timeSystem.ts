import { Transducer } from 'model';
import { AnimationTimer } from 'timer/animationTimer';

const DEFAULT_TRANSDUCER: Transducer = (elapsedTime: number) => elapsedTime;

export class TimeSystem {
  gameTime = 0;

  lastTimeTransducerWasSet = 0;

  timer = new AnimationTimer();

  transducer: Transducer = DEFAULT_TRANSDUCER;

  calculateGameTime() {
    this.gameTime =
      this.lastTimeTransducerWasSet +
      this.transducer(this.timer.getElapsedTime());
    this.reset();

    return this.gameTime;
  }

  reset() {
    this.timer.reboot();
    this.lastTimeTransducerWasSet = this.gameTime;
  }

  setTransducer(transducer: Transducer, duration?: number) {
    const lastTransducer = this.transducer;

    this.calculateGameTime();
    this.reset();
    this.transducer = transducer;

    if (duration) {
      setTimeout(() => this.setTransducer(lastTransducer), duration);
    }
  }

  start() {
    this.timer.start();
  }
}
