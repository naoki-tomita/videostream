import { query } from "./Query";
import { Observable, EventCallback } from "./Observable";

export class Video extends Observable {
  video: HTMLVideoElement;
  constructor() {
    super();
    const id = query("id");
    this.video = document.getElementById("video") as HTMLVideoElement;
    this.video.setAttribute("src", `/videos/${id}`);
    this.initEvents();
  }

  initEvents() {
    this.video.addEventListener("play", () => {
      this.dispatch("play");
    });
    this.video.addEventListener("pause", () => {
      this.dispatch("pause");
    })
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  now() {
    return this.video.currentTime;
  }

  onPlay(cb: EventCallback) {
    this.on("play", cb);
  }

  onPause(cb: EventCallback) {
    this.on("pause", cb);
  }
}