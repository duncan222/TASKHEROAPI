// audio.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioPlayer: HTMLAudioElement = new Audio();

  constructor() { }

  loadSound(src: string): void {
    this.audioPlayer.src = src;
    this.audioPlayer.load();
  }

  play(): void {
    this.audioPlayer.play();
  }

  pause(): void {
    this.audioPlayer.pause();
  }

  stop(): void {
    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;
  }
}