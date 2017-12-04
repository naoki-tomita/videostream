import { Video } from "./Video";
import { query } from "./Query";

export class Comments {
  commentView: HTMLDivElement;
  comment: HTMLInputElement;
  sendBtn: HTMLButtonElement;
  video: Video;
  isPlaying: boolean = false;
  constructor(video: Video) {
    this.commentView = document.getElementById("comments") as HTMLDivElement;
    this.comment = document.getElementById("comment") as HTMLInputElement;
    this.sendBtn = document.getElementById("send") as HTMLButtonElement;
    this.video = video;
    this.initEvents();
  }

  initEvents() {
    this.sendBtn.addEventListener("click", () => {
      const comment = this.comment.value;
      const currentTime = this.video.now();
      this.send(comment, currentTime);
      this.show(comment);
    });
  }

  play() {
    if (this.isPlaying) {
      return;
    }
    this.isPlaying = true;
    this.playing();
  }

  async playing() {
    if (!this.isPlaying) {
      return;
    }
    const comments = await this.list();
    const now = this.video.now();
    comments
      .filter(c => (c.time >= now && c.time < now + 0.5))
      .forEach(c => this.show(c.comment));
    setTimeout(this.playing.bind(this), 500);
  }

  pause() {
    if (!this.isPlaying) {
      return;
    }
    this.isPlaying = false;
  }

  async list(): Promise<Array<{
    comment: string;
    time: number;
  }>> {
    const id = query("id");
    const list = await fetch(`/comment/${id}`);
    return await list.json() as Array<{comment: string, time: number}>;
  }

  async send(comment: string, time: number) {
    const id = query("id");
    const body = { comment, time };
    const headers = new Headers({ "content-type": "application/json" });
    return await fetch(`/comment/${id}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  }

  show(comment: string) {
    const el = document.createElement("div");
    el.innerHTML = comment;
    this.commentView.appendChild(el);
    setTimeout(() => {
      this.commentView.removeChild(el);
    }, 3000);
  }
}