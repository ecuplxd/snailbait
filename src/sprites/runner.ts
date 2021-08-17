import { RUNNER_LEFT, STARTING_RUNNER_TRACK } from 'config';
import { calculatePlatformTop } from 'utils';

export class RunnerSprite {
  image = new Image();

  runnerLeft = RUNNER_LEFT;

  runnerTrack = STARTING_RUNNER_TRACK;

  constructor() {
    this.image.src = '../../images/runner.png';
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.runnerLeft,
      calculatePlatformTop(this.runnerTrack) - this.image.height
    );
  }
}
