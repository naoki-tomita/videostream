import { Video } from "./Video";
import { query } from "./Query";

export class Comments {
  commentView: CommentView;
  comment: HTMLInputElement;
  sendBtn: HTMLButtonElement;
  video: Video;
  isPlaying: boolean = false;
  constructor(video: Video) {
    this.comment = document.getElementById("comment") as HTMLInputElement;
    this.sendBtn = document.getElementById("send") as HTMLButtonElement;
    this.commentView = new CommentView();
    this.video = video;
    this.initEvents();
  }

  initEvents() {
    this.sendBtn.addEventListener("click", () => {
      const comment = this.comment.value;
      const currentTime = this.video.now();
      sendComment(comment, currentTime);
      this.addComment(comment);
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
      .forEach(c => this.addComment(c.comment));
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

  addComment(comment: string) {
    this.commentView.addComment(comment);
  }
}

type CommentElement = {
  pos: {
    x: number;
    y: number;
  };
  text: string;
}
class CommentView {
  private context: CanvasRenderingContext2D;
  comments: CommentElement[] = [];
  maxWidth: number;
  maxHeight: number;
  constructor() {
    const el = document.getElementById("comments") as HTMLCanvasElement
    this.context = el.getContext("2d");
    this.maxWidth = el.width;
    this.maxHeight = el.height;
    this.animate();
  }

  addComment(comment: string) {
    this.comments.push({
      pos: {
        x: this.maxWidth,
        y: Math.random() * this.maxHeight,
      },
      text: comment,
    });
  }

  render() {
    this.context.clearRect(0, 0, this.maxWidth, this.maxHeight);
    this.comments.forEach(c => this.renderComment(c));
    this.comments.forEach(c => c.pos.x -= 1);
    this.comments = this.comments.filter(c => c.pos.x >= 0);
  }

  renderComment(comment: CommentElement) {
    this.context.font = "15px メイリオ";
    this.context.strokeStyle = "white";
    this.context.lineWidth = 3;
    this.context.fillStyle = "black";
    this.context.strokeText(comment.text, comment.pos.x, comment.pos.y);
    this.context.fillText(comment.text, comment.pos.x, comment.pos.y);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
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
