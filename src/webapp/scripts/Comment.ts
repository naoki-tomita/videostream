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
      sendComment(comment, currentTime);
      this.show(comment);
    });
    this.video.onPlay(this.play.bind(this));
    this.video.onPause(this.pause.bind(this));
  }

  play() {
    if (this.isPlaying) {
      return;
    }
    this.isPlaying = true;
    this.polling();
  }

  async polling() {
    if (!this.isPlaying) {
      return;
    }
    const comments = await listComment();
    const now = this.video.now();
    comments
      .filter(c => (c.time >= now && c.time < now + 0.5))
      .forEach(c => this.show(c.comment));
    // bug included...
    // when click button repeatedly interval less than 500ms, polling will be executed twice time.
    setTimeout(this.polling.bind(this), 500);
  }

  pause() {
    if (!this.isPlaying) {
      return;
    }
    this.isPlaying = false;
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

async function sendComment(comment: string, time: number) {
  const id = query("id");
  const body = { comment, time };
  const headers = new Headers({ "content-type": "application/json" });
  return await fetch(`/apis/comments/${id}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

async function listComment(): Promise<Array<{
  comment: string;
  time: number;
}>> {
  const id = query("id");
  const list = await fetch(`/apis/comments/${id}`);
  return await list.json() as Array<{comment: string, time: number}>;
}
