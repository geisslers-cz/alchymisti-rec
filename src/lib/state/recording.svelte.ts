import beepUrl from '../assets/rec-beep.wav?url';
import introUrl from '../assets/song-intro.wav?url';

export enum RecordingStep {
  Intro = 'intro',
  Ready = 'ready',
  Recording = 'recording',
  Done = 'done',
}

export class RecordingState {
  public readonly recordingTime: number;
  public readonly introStartTime?: number;

  private step: RecordingStep = $state(RecordingStep.Intro);
  private initialised: boolean = false;
  private beep?: AudioBuffer;
  private intro?: AudioBuffer;
  private recordingStart: number = $state(0);
  private introStart?: number = $state();
  private tmr?: number;
  private frame?: symbol = $state();
  private nowPlaying: Map<AudioBufferSourceNode, number> = new Map();
  private readonly ctx: AudioContext = new AudioContext({
    latencyHint: 'interactive',
  });

  constructor() {
    this.recordingTime = $derived(touch(this.ctx.currentTime - this.recordingStart, this.frame));
    this.introStartTime = $derived(
      this.introStart !== undefined ? this.introStart - this.recordingStart : undefined,
    );
  }

  get currentStep(): RecordingStep {
    return this.step;
  }

  get timeSinceIntroEnd(): number {
    return this.intro && this.introStartTime
      ? this.recordingTime - (this.introStartTime + this.intro.length / this.intro.sampleRate)
      : 0;
  }

  async begin(): Promise<void> {
    if (!this.initialised) {
      this.initialised = true;

      await this.ctx.resume();

      [this.beep, this.intro] = await Promise.all([
        this.loadAudio(beepUrl),
        this.loadAudio(introUrl),
      ]);
    }

    this.step = RecordingStep.Ready;
  }

  startRecording(): void {
    if (!this.beep || !this.intro || this.step !== RecordingStep.Ready) {
      return;
    }

    this.step = RecordingStep.Recording;
    this.recordingStart = Math.ceil(this.ctx.currentTime + 1);

    const beep = new AudioBufferSourceNode(this.ctx, {
      buffer: this.beep,
    });

    beep.connect(this.createMonoMaker()).connect(this.ctx.destination);
    beep.start(this.recordingStart);
    this.nowPlaying.set(beep, this.recordingStart + this.beep.length / this.beep.sampleRate);

    this.tick();
  }

  playIntro(): void {
    if (!this.intro || this.step !== RecordingStep.Recording) {
      return;
    }

    this.introStart = Math.ceil(this.ctx.currentTime);

    if (this.introStart - this.ctx.currentTime < 0.1) {
      ++this.introStart;
    }

    const intro = new AudioBufferSourceNode(this.ctx, {
      buffer: this.intro,
    });

    intro.connect(new GainNode(this.ctx, { gain: 4 })).connect(this.ctx.destination);
    intro.start(this.introStart);
    this.nowPlaying.set(intro, this.introStart + this.intro.length / this.intro.sampleRate);
  }

  private readonly tick = (): void => {
    this.tmr = requestAnimationFrame(this.tick);
    this.frame = Symbol();

    for (const [node, endTime] of this.nowPlaying) {
      if (endTime < this.ctx.currentTime) {
        this.nowPlaying.delete(node);
        node.disconnect();
      }
    }
  };

  done(): void {
    if (this.step !== RecordingStep.Recording) {
      return;
    }

    this.stopRecording();
    this.step = RecordingStep.Done;
  }

  restart(): void {
    if (this.step !== RecordingStep.Done) {
      return;
    }

    this.step = RecordingStep.Intro;
    this.recordingStart = 0;
    this.introStart = undefined;
  }

  private stopRecording(): void {
    if (this.tmr) {
      cancelAnimationFrame(this.tmr);
      this.tmr = undefined;
    }

    for (const node of this.nowPlaying.keys()) {
      node.stop();
      node.disconnect();
    }

    this.nowPlaying.clear();
  }

  private async loadAudio(url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    return this.ctx.decodeAudioData(await response.arrayBuffer());
  }

  private createMonoMaker(): AudioNode {
    const split = new ChannelSplitterNode(this.ctx, {
      channelInterpretation: 'discrete',
      numberOfOutputs: 2,
    });

    split.connect(this.ctx.destination, 0);
    split.connect(this.ctx.destination, 1);
    return split;
  }
}

function touch<T>(value: T, ...deps: any[]): T;
function touch<T>(value: T): T {
  return value;
}
