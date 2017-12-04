import { query } from "./Query";

export class Video {
  video: HTMLVideoElement;
  constructor() {
    const id = query("id");
    this.video = document.getElementById("video") as HTMLVideoElement;
    this.video.setAttribute("src", `/video/${id}`);
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
}