import { fakeIn, fakeOut } from 'animation';
import { PAUSED_CHECK_INTERVAL } from 'config';
import { Fps } from 'fps';
import { KeyBinding, TimeStamp } from 'model';
import { Subscription, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BackgroundSprite } from 'sprites/background/sprite';
import { BAT_SPRITES } from 'sprites/bat';
import { BatSprite } from 'sprites/bat/sprite';
import { BEE_SPRITES } from 'sprites/bee';
import { BeeSprite } from 'sprites/bee/sprite';
import { BUTTON_SPRITES } from 'sprites/button';
import { ButtonSprite } from 'sprites/button/sprite';
import { COIN_SPRITES } from 'sprites/coin';
import { ConinSprite } from 'sprites/coin/sprite';
import { PLATFORM_SPRITES } from 'sprites/platform';
import { PLATFORM_VELOCITY_MULTIPLIER } from 'sprites/platform/data';
import { PlatformSprite } from 'sprites/platform/sprite';
import { RUBY_SPRITES } from 'sprites/ruby';
import { RubySprite } from 'sprites/ruby/sprite';
import { RunnerSprite } from 'sprites/runner/sprite';
import { SAPPHIRE_SPRITES } from 'sprites/sapphire';
import { SapphireSprite } from 'sprites/sapphire/sprite';
import { SNAIL_SPRITES } from 'sprites/snail';
import { SnailSprite } from 'sprites/snail/sprite';
import { Sprite } from 'sprites/sprite';
import { TimeSystem } from 'timeSystem';
import { skipFn } from 'utils';

export class Snailbait {
  backgroundSprite = new BackgroundSprite();

  batSprites: BatSprite[] = BAT_SPRITES;

  beeSprites: BeeSprite[] = BEE_SPRITES;

  buttonSprites: ButtonSprite[] = BUTTON_SPRITES;

  canvas!: HTMLCanvasElement;

  coinSprites: ConinSprite[] = COIN_SPRITES;

  context!: CanvasRenderingContext2D;

  countdown_!: Subscription;

  fps = new Fps();

  fpsEl!: HTMLDivElement;

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
      keys: ['j', 'f', ' '],
      command: () => {
        this.runnerSprite.jump(this.timeSystem.calculateGameTime());
      },
    },
  ];

  loadingEl!: HTMLDivElement;

  paused = false;

  pausedCheckInterval = PAUSED_CHECK_INTERVAL;

  pauseStartTime: TimeStamp = 0;

  platformSprites: PlatformSprite[] = PLATFORM_SPRITES;

  rubySprites: RubySprite[] = RUBY_SPRITES;

  runnerSprite: RunnerSprite = new RunnerSprite();

  sapphireSprites: SapphireSprite[] = SAPPHIRE_SPRITES;

  score = 0;

  scoreEl!: HTMLDivElement;

  snailSprites: SnailSprite[] = SNAIL_SPRITES;

  sprites: Sprite[] = [
    ...this.platformSprites,
    ...this.batSprites,
    ...this.beeSprites,
    ...this.coinSprites,
    ...this.buttonSprites,
    ...this.rubySprites,
    ...this.sapphireSprites,
    ...this.snailSprites,
    ...this.snailSprites.map((snail) => snail.arms[0]),
    this.runnerSprite,
  ];

  timeRate = 1.0;

  timeSystem = new TimeSystem();

  toastEl!: HTMLDivElement;

  constructor() {
    this.canvas = this.getGameElement<HTMLCanvasElement>('game-canvas');
    this.toastEl = this.getGameElement('toast');
    this.fpsEl = this.getGameElement('fps');
    this.scoreEl = this.getGameElement('score');
    this.loadingEl = this.getGameElement('loading');

    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.run = this.run.bind(this);
    this.updateScore(0);
    this.listenKeyboard();
  }

  draw() {
    this.moveSprites();
    this.backgroundSprite.draw(this.context);

    // 更新和绘制 sprite 分离
    // 还可以避免更新一个 sprite 对象可能会影响另一个 sprite 对象的位置或外观
    this.updateSprites();
    this.drawSprites();
  }

  drawSprites() {
    this.sprites
      .filter((sprite) => sprite.inView())
      .forEach((sprite) => {
        this.context.translate(-sprite.hOffset, 0);
        sprite.draw(this.context);
        this.context.translate(sprite.hOffset, 0);
      });
  }

  findKeyBinding(key: string): KeyBinding | undefined {
    return this.keyBindings.find(
      (binding) => ([] as string[]).concat(binding.keys).indexOf(key) !== -1
    );
  }

  getGameElement<T extends HTMLElement = HTMLDivElement>(id: string): T {
    return document.getElementById('snailbait-' + id) as T;
  }

  hideToast() {
    fakeOut(this.toastEl, 450);
  }

  leaveGame() {
    if (this.countdown_) {
      this.countdown_.unsubscribe();
    }

    if (!this.paused) {
      this.togglePaused();
    }
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

  moveSprites() {
    const platformVelocity =
      this.backgroundSprite.velocityX * PLATFORM_VELOCITY_MULTIPLIER;

    this.backgroundSprite.move(this.fps);
    this.sprites
      .filter((sprite) => sprite.type !== 'runner')
      .forEach((sprite) => sprite.move(this.fps, platformVelocity));
  }

  reEnterGame() {
    if (this.paused) {
      this.countdown_ = timer(0, 1000)
        .pipe(
          map((x) => 3 - x),
          take(4)
        )
        .subscribe(
          (num) => num && this.revealToast('' + num),
          skipFn,
          () => {
            this.hideToast();
            this.togglePaused();
          }
        );
    }
  }

  revealToast(text: string) {
    this.toastEl.innerText = text;
    fakeIn(this.toastEl);
    setTimeout(() => this.hideToast(), 500);
  }

  run(now: TimeStamp) {
    now = this.timeSystem.calculateGameTime();

    if (this.paused) {
      // TODO
      // ？？ 这里为啥要检测是否恢复啊很奇怪……明明能知道确切的游戏暂停/启动时间点
      // setTimeout(
      //   () => requestAnimationFrame(this.run),
      //   this.pausedCheckInterval
      // );
    } else {
      this.fps.calc(now, this.timeRate, (value) => this.updateFps(value));
      this.draw();
      this.fps.update(now);
      requestAnimationFrame(this.run);
    }
  }

  setTimeRate(rate: number) {
    this.timeRate = rate;
    this.timeSystem.setTransducer((now: number) => now * this.timeRate);
  }

  startGame() {
    this.timeSystem.start();
    requestAnimationFrame(this.run);
  }

  togglePaused() {
    const now = this.timeSystem.calculateGameTime();

    this.paused = !this.paused;

    this.togglePausedStateOfAllBehaviors(now);

    if (this.paused) {
      this.pauseStartTime = now;
    } else {
      this.fps.increaseUpdate(now - this.pauseStartTime);
      this.startGame();
    }
  }

  togglePausedStateOfAllBehaviors(now: TimeStamp) {
    this.sprites
      .filter((spirte) => spirte.behavior)
      .map((sprite) => sprite.behavior!.updateExecuteTime(now))
      .forEach((behavior) => {
        if (this.paused) {
          behavior!.pause();
        } else {
          behavior!.unpause();
        }
      });
  }

  turnLeft() {
    this.backgroundSprite.turnLeft();
    this.runnerSprite.turnLeft();
  }

  turnRight() {
    this.backgroundSprite.turnRight();
    this.runnerSprite.turnRight();
  }

  updateFps(value: number) {
    this.fpsEl.innerText = value + ' FPS';
  }

  updateScore(score: number) {
    this.score = score;
    this.scoreEl.innerText = '' + score;
  }

  updateSprites() {
    this.sprites
      .filter((sprite) => sprite.inView())
      .forEach((sprite) => sprite.update(this.context, this.fps));
  }
}
