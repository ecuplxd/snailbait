import { PAUSED_CHECK_INTERVAL } from 'config';
import { fps } from 'fps';
import { KeyBinding, TimeStamp } from 'model';
import { Subscription, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BackgroundSprite } from 'sprites/backgroud';
import { PlatformSprite } from 'sprites/platform';
import { RunnerSprite } from 'sprites/runner';
import { skipFn } from 'utils';

export class Snailbait {
  fpsEl!: HTMLDivElement;

  toastEl!: HTMLDivElement;

  context!: CanvasRenderingContext2D;

  backgroundSprite = new BackgroundSprite();

  runnerSprite = new RunnerSprite();

  platformSprite = new PlatformSprite();

  currentTime: TimeStamp = 0;

  paused = false;

  pausedCheckInterval = PAUSED_CHECK_INTERVAL;

  pauseStartTime: TimeStamp = 0;

  countdown_!: Subscription;

  keyBindings: KeyBinding[] = [
    {
      name: '向右移动',
      keys: ['k', 'ArrowRight'],
      command: () => this.turnRight(),
    },
    {
      name: '向左移动',
      keys: ['d', 'ArrowLeft'],
      command: () => this.turnLeft(),
    },
    {
      name: '暂停游戏',
      keys: 'p',
      command: () => this.togglePaused(),
    },
    {
      name: '跳跃',
      keys: 'j',
      command: () => this.jump(),
    },
  ];

  constructor() {
    const canvas = document.getElementById(
      'snailbait-game-canvas'
    ) as HTMLCanvasElement;

    this.toastEl = document.getElementById('snailbait-toast') as HTMLDivElement;
    this.fpsEl = document.getElementById(
      'snailbait-fps-info'
    ) as HTMLDivElement;

    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.run = this.run.bind(this);
    this.listenKeyboard();
  }

  draw() {
    this.platformSprite.move(this.currentTime, this.backgroundSprite.velocity);
    this.backgroundSprite.move(this.currentTime);

    this.backgroundSprite.draw(this.context);
    this.runnerSprite.draw(this.context);
    this.platformSprite.draw(this.context);
  }

  run(now: TimeStamp) {
    if (this.paused) {
      // TODO
      // ？？ 这里为啥要检测是否恢复啊很奇怪……明明能知道确切的游戏暂停/启动时间点
      setTimeout(
        () => requestAnimationFrame(this.run),
        this.pausedCheckInterval
      );
    } else {
      this.currentTime = now;
      fps.calc(now, (fps) => this.updateFps(fps));
      this.draw();
      fps.update(now);
      requestAnimationFrame(this.run);
    }
  }

  updateFps(fps: number) {
    this.fpsEl.innerText = fps + ' FPS';
  }

  startGame() {
    requestAnimationFrame(this.run);
  }

  turnLeft() {
    this.backgroundSprite.turnLeft();
  }

  turnRight() {
    this.backgroundSprite.turnRight();
  }

  jump() {}

  togglePaused() {
    let now = +new Date();

    this.paused = !this.paused;

    if (this.paused) {
      this.pauseStartTime = now;
    } else {
      fps.increaseUpdate(now - this.pauseStartTime);
      // this.startGame();
    }
  }

  findKeyBinding(key: string): KeyBinding | undefined {
    return this.keyBindings.find(
      (binding) => ([] as string[]).concat(binding.keys).indexOf(key) !== -1
    );
  }

  leaveGame() {
    if (this.countdown_) {
      this.countdown_.unsubscribe();
    }

    if (!this.paused) {
      this.togglePaused();
    }
  }

  reEnterGame() {
    if (this.paused) {
      this.countdown_ = timer(0, 1000)
        .pipe(
          map((x) => 3 - x),
          take(4)
        )
        .subscribe(
          (num) => this.revealToast('' + num),
          skipFn,
          () => {
            this.hideToast();
            this.togglePaused();
          }
        );
    }
  }

  hideToast() {
    this.toastEl.style.display = 'none';
  }

  revealToast(text: string) {
    this.toastEl.style.display = 'block';
    this.toastEl.innerText = text;
  }

  listenKeyboard() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      const keyBinding = this.findKeyBinding(event.key);

      if (keyBinding) {
        event.preventDefault();
        event.stopPropagation();

        keyBinding.command();
      }
    });

    window.addEventListener('blur', () => this.leaveGame());

    window.addEventListener('focus', () => this.reEnterGame());
  }
}
