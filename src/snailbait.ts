import { fps } from 'fps';
import { TimeStamp } from 'model';
import { BackgroundSprite } from 'sprites/backgroud';
import { PlatformSprite } from 'sprites/platform';
import { RunnerSprite } from 'sprites/runner';

export class Snailbait {
  fpsEl!: HTMLDivElement;

  context!: CanvasRenderingContext2D;

  backgroundSprite = new BackgroundSprite();

  runnerSprite = new RunnerSprite();

  platformSprite = new PlatformSprite();

  currentTime: TimeStamp = 0;

  constructor() {
    let canvas = document.getElementById(
      'snailbait-game-canvas'
    ) as HTMLCanvasElement;

    this.fpsEl = document.getElementById('fps-info') as HTMLDivElement;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.run = this.run.bind(this);
  }

  draw() {
    this.platformSprite.move(this.currentTime, this.backgroundSprite.velocity);
    this.backgroundSprite.move(this.currentTime);

    this.backgroundSprite.draw(this.context);
    this.runnerSprite.draw(this.context);
    this.platformSprite.draw(this.context);
  }

  run(now: TimeStamp) {
    this.currentTime = now;
    fps.calc(now, (fps) => this.updateFps(fps));
    this.draw();
    fps.update(now);
    requestAnimationFrame(this.run);
  }

  updateFps(fps: number) {
    this.fpsEl.innerText = fps + ' FPS';
  }

  startGame() {
    requestAnimationFrame(this.run);
  }
}
