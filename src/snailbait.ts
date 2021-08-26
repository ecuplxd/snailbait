import { fakeIn, fakeOut } from 'animation';
import { PAUSED_CHECK_INTERVAL } from 'config';
import { Fps } from 'fps';
import { AudioChannel, KeyBinding, Sound, SoundType, TimeStamp } from 'model';
import { Subscription, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SMOKING_HOLE_SPRITES } from 'sprites/smoke';
import { SmokingHoleSprite } from 'sprites/smoke/smoke';
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
import { RUNNER_EXPLOSION_DURATION } from 'sprites/runner/data';
import { RunnerSprite } from 'sprites/runner/sprite';
import { SAPPHIRE_SPRITES } from 'sprites/sapphire';
import { SapphireSprite } from 'sprites/sapphire/sprite';
import { SNAIL_SPRITES } from 'sprites/snail';
import { SnailSprite } from 'sprites/snail/sprite';
import { Sprite } from 'sprites/sprite';
import { SpriteSheetResource } from 'sprites/spriteSheet';
import { TimeSystem } from 'timeSystem';
import { skipFn } from 'utils';

export class Snailbait {
  audioChannels: AudioChannel[] = [];

  audioSpriteCountdown = 3;

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

  gameStarted = false;

  graphicsReady = false;

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

  lives = 3;

  loadingEl!: HTMLDivElement;

  musicCheckboxEl!: HTMLInputElement;

  musicEl!: HTMLAudioElement;

  musicOn!: boolean;

  paused = false;

  pausedCheckInterval = PAUSED_CHECK_INTERVAL;

  pauseStartTime: TimeStamp = 0;

  platformSprites: PlatformSprite[] = PLATFORM_SPRITES;

  playing = true;

  rubySprites: RubySprite[] = RUBY_SPRITES;

  runnerSprite: RunnerSprite = new RunnerSprite();

  sapphireSprites: SapphireSprite[] = SAPPHIRE_SPRITES;

  score = 0;

  scoreEl!: HTMLDivElement;

  smokingHoleSprites: SmokingHoleSprite[] = SMOKING_HOLE_SPRITES;

  snailSprites: SnailSprite[] = SNAIL_SPRITES;

  soundCheckboxEl!: HTMLInputElement;

  soundOn!: boolean;

  sounds: {
    [key in SoundType]: Sound;
  } = {
    cannonSound: new Sound(7.7, 1031),
    coinSound: new Sound(7.1, 588),
    electricityFlowingSound: new Sound(1.03, 1753),
    explosionSound: new Sound(4.3, 760),
    pianoSound: new Sound(5.6, 395),
    thudSound: new Sound(3.1, 809),
  };

  soundSpritesEl!: HTMLAudioElement;

  sprites: Sprite[] = [
    ...this.smokingHoleSprites,
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
    this.musicEl = this.getGameElement('music');
    this.musicCheckboxEl = this.getGameElement('music-checkbox');
    this.musicOn = this.musicCheckboxEl.checked;
    this.musicEl.volume = 0.01;
    this.soundSpritesEl = this.getGameElement('audio-sprites');
    this.soundCheckboxEl = this.getGameElement('sound-checkbox');
    this.soundOn = this.soundCheckboxEl.checked;
    this.audioChannels.push(new AudioChannel(this.soundSpritesEl));

    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.run = this.run.bind(this);
    this.sprites.forEach((sprite) => sprite.bindHost(this));
    this.runnerSprite.behavior?.setRelateSprites(this.sprites);
  }

  createAudioChannels() {
    this.audioChannels.forEach((channel, index) => {
      if (index !== 0) {
        const audio = document.createElement('audio');

        audio.src = this.soundSpritesEl.currentSrc;
        audio.setAttribute('autobuffer', 'true');
        audio.addEventListener('loadeddata', () => this.soundLoaded(), false);

        channel.audio = audio;
      }
    });

    this.audioChannels.push(
      ...Array(this.audioSpriteCountdown)
        .fill(0)
        .map(() => {
          const audio = document.createElement('audio');

          audio.src = this.soundSpritesEl.currentSrc;
          audio.setAttribute('autobuffer', 'true');
          audio.addEventListener('loadeddata', () => this.soundLoaded(), false);

          return new AudioChannel(audio);
        })
    );
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

  endLifeTransition() {
    const TIME_REST_DELAY = 1000;
    const RUN_DELAY = 500;

    this.canvas.style.display = '1.0';

    if (this.lives === 0) {
      this.gameOver();
    } else {
      this.restartLevel();
    }

    setTimeout(() => {
      this.setTimeRate(1.0);

      setTimeout(() => {
        this.runnerSprite.animationRate = 0;
      }, RUN_DELAY);
    }, TIME_REST_DELAY);
  }

  findKeyBinding(key: string): KeyBinding | undefined {
    return this.keyBindings.find(
      (binding) => ([] as string[]).concat(binding.keys).indexOf(key) !== -1
    );
  }

  gameOver() {}

  getFirstAvailableAudioChannel(): AudioChannel | undefined {
    return this.audioChannels.find((channel) => !channel.playing);
  }

  getGameElement<T extends HTMLElement = HTMLDivElement>(id: string): T {
    return document.getElementById('snailbait-' + id) as T;
  }

  hideToast() {
    fakeOut(this.toastEl, 450);
  }

  init() {
    this.updateScore(0);
    this.initDomEvent();
    this.listenKeyboard();
    this.spriteSheetLoad();
  }

  initDomEvent() {
    this.musicCheckboxEl.addEventListener('change', () => {
      this.musicOn = this.musicCheckboxEl.checked;
      this.toggleMusic(this.musicOn);
    });

    this.soundCheckboxEl.addEventListener('change', () => {
      this.soundOn = this.soundCheckboxEl.checked;
    });
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
      if (!this.playing || this.runnerSprite.exploding) {
        return;
      }

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

  loseLife() {
    let transitionDuration = 3000;

    this.lives--;

    if (this.runnerSprite.exploding) {
      this.startLifeTransition(RUNNER_EXPLOSION_DURATION);

      transitionDuration += RUNNER_EXPLOSION_DURATION;
    } else {
      this.startLifeTransition();
    }

    setTimeout(() => this.endLifeTransition(), transitionDuration);
  }

  makeAllSpritesVisible() {
    this.sprites.forEach((sprite) => {
      sprite.visible = true;
    });
  }

  moveSprites() {
    const platformVelocity =
      this.backgroundSprite.velocityX * PLATFORM_VELOCITY_MULTIPLIER;

    this.backgroundSprite.move(this.fps);
    this.sprites
      .filter((sprite) => sprite.type !== 'runner')
      .forEach((sprite) =>
        sprite.move(
          this.fps,
          sprite.type === 'smoking hole'
            ? this.backgroundSprite.hOffset
            : platformVelocity
        )
      );
  }

  playSound(soundType: SoundType) {
    if (this.soundOn) {
      const sound = this.sounds[soundType];
      const chanel = this.getFirstAvailableAudioChannel();

      if (!chanel) {
        console.warn('All audio channels are busy. Cannot play sound');
      } else {
        const audio = chanel.audio;

        audio.volume = sound.volume;

        chanel.seek(sound);
        chanel.play();

        setTimeout(() => {
          chanel.stopPlay();
          chanel.seek(sound);
        }, sound.duration);
      }
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
          (num) => num && this.revealToast('' + num),
          skipFn,
          () => {
            this.hideToast();
            this.togglePaused();
          }
        );
    }
  }

  resetOffsets() {
    this.backgroundSprite.reset();
    this.platformSprites.forEach((platform) => platform.reset());
  }

  restartLevel() {
    this.resetOffsets();
    this.runnerSprite.reset();
    this.makeAllSpritesVisible();
    this.playing = true;
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

  soundLoaded() {
    this.audioSpriteCountdown--;

    if (this.audioSpriteCountdown === 0) {
      if (!this.gameStarted && this.graphicsReady) {
        this.startGame();
      }
    }
  }

  spriteSheetLoad() {
    SpriteSheetResource.onload = () => {
      this.graphicsReady = true;
      this.createAudioChannels();
    };
  }

  startGame() {
    this.timeSystem.start();
    this.startMusic();
    requestAnimationFrame(this.run);
  }

  startLifeTransition(delay: number = 0) {
    const CANVAS_TRANSITION_OPACITY = '0.05';
    const SLOW_MOTION_RATE = 0.1;

    this.canvas.style.opacity = CANVAS_TRANSITION_OPACITY;
    this.playing = false;

    setTimeout(() => {
      this.setTimeRate(SLOW_MOTION_RATE);
      this.runnerSprite.hide();
    }, delay);
  }

  startMusic() {
    if (this.musicOn) {
      // 处理无法自动播放
      // play() failed because the user didn't interact with the document first.
      const play = this.musicEl.play();

      if (play) {
        play.then(skipFn).catch(() => {
          this.musicEl.play();
        });
      }
    }
  }

  toggleMusic(play: boolean) {
    if (play) {
      this.musicEl.play();
    } else {
      this.musicEl.pause();
    }
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

    if (this.musicOn) {
      this.toggleMusic(!this.paused);
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
