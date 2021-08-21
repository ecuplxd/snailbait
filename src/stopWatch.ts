import { TimeStamp } from 'model';

export class StopWatch {
  elapsed!: number; // 经过的时间

  paused = false; // 是否被暂停

  running = false; // 是否正在运行

  startPause: TimeStamp = 0; // 暂停开始的时间

  startTime: TimeStamp = 0; // 开始运行的时间

  totalPausedTime = 0; // 被暂停的总时间

  getElapsedTime() {
    const now = +new Date();

    if (this.running) {
      return now - this.startTime - this.totalPausedTime;
    } else {
      return this.elapsed;
    }
  }

  isPaused() {
    return this.paused;
  }

  isRunning() {
    return this.running;
  }

  // 暂停
  pause() {
    const now = +new Date();

    this.startPause = now;
    this.paused = true;
  }

  // 重置
  reset() {
    const now = +new Date();

    this.elapsed = 0;
    this.startTime = now;
    this.running = false;
    this.totalPausedTime = 0;
    this.startPause = 0;
  }

  // 开始
  start() {
    const now = +new Date();

    this.startTime = now;
    this.running = true;
    this.totalPausedTime = 0;
    this.startPause = 0;
  }

  // 停止
  stop() {
    const now = +new Date();

    if (this.paused) {
      this.unpause();
    }

    this.elapsed = now - this.startTime - this.totalPausedTime;
    this.running = false;
  }

  // 取消暂停
  unpause() {
    const now = +new Date();

    if (!this.paused) {
      return;
    }

    this.totalPausedTime += now - this.startPause;
    this.startPause = 0;
    this.paused = false;
  }
}
