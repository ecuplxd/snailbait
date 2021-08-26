import { Timer } from 'timer/timer';

export type TimeStamp = number;

export type TimerPair = Timer[];

export type Transducer = (time: number) => number;

export interface KeyBinding {
  command: () => void;
  keys: string | string[];
  name: string;
}

export class Sound {
  volume = 0.5;

  constructor(public position = 0, public duration = 0, volume = 0.5) {
    this.volume = volume;
  }
}

export type SoundType =
  | 'cannonSound'
  | 'coinSound'
  | 'electricityFlowingSound'
  | 'explosionSound'
  | 'pianoSound'
  | 'thudSound';

export class AudioChannel {
  constructor(
    public audio: HTMLAudioElement,
    public playing: boolean = false
  ) {}

  play() {
    try {
      this.audio.play();
      this.playing = true;
    } catch (error) {
      console.log(error);
    }
  }

  seek(sound: Sound) {
    try {
      this.audio.pause();
      this.audio.currentTime = sound.position;
    } catch (error) {
      console.log(error);
    }
  }

  stopPlay() {
    this.playing = false;
  }
}
