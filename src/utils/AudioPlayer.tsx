class AudioPlayer {
  el: HTMLAudioElement | undefined;

  constructor(url: string) {
    this.el = new Audio(url);
    this.el.autoplay = true;
    this.el.addEventListener('canplay', this.onCanplay);
  }

  async onCanplay(event: Event) {
    await this.el?.play();
  }

  onError(listener: (error: ErrorEvent) => void) {
    this.el?.addEventListener('error', listener);
  }

  onEnd(listener: (event: Event) => void) {
    this.el?.addEventListener('ended', listener);
  }

  stop() {
    const audio = this.el as HTMLAudioElement;
    audio.removeEventListener('canplay', this.onCanplay);
    audio.pause();
  }
}

export default AudioPlayer;
