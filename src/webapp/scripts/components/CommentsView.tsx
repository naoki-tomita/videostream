import * as React from "react";
import { CommentModel } from "../models/Comment";

interface Comment {
  comment: string;
  time: number;
}

interface Props {
  now: () => number;
  commentModel: CommentModel;
}

export class CommentsView extends React.Component<Props> {
  refs: {
    canvas: HTMLCanvasElement;
    wrapper: HTMLDivElement;
  }
  lastTime: number;
  renderer: CommentRenderer;
  comments: Comment[] = [];

  constructor(props: Props, context?: any) {
    super(props, context);
    this.renderer = new CommentRenderer();
    const { commentModel } = this.props;
    commentModel.onListUpdate(() => {
      this.comments = commentModel.list;
    });
    commentModel.onCommentPost((post) => {
      this.renderComment(post.comment);
    });
    commentModel.listComment();
    this.animate();
  }

  render() {
    // cover parent.
    const style: React.CSSProperties = {
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "100%",
      height: "100%",
    };
    return (
      <div ref="wrapper" style={style}>
        <canvas ref="canvas"></canvas>
      </div>
    );
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props !== nextProps) {
      this.updateCanvas();
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const { canvas, wrapper } = this.refs;
    canvas.setAttribute("width", `${wrapper.clientWidth}px`);
    canvas.setAttribute("height", `${wrapper.clientHeight}px`);
    this.renderer.updateCanvas(canvas);
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderComments();
  }

  private renderComments() {
    if (!this.refs.canvas) {
      return;
    }
    const { now } = this.props;
    const time = now();
    const lastTime = this.lastTime;
    this.comments
      .filter(c => (c.time >= lastTime && c.time < time))
      .forEach(c => this.renderComment(c.comment));
    this.renderer.render();
    this.lastTime = time;
  }

  private renderComment(comment: string) {
    this.renderer.push(comment);
  }
}

interface CommentElement {
  text: string,
  pos: {
    x: number;
    y: number;
  },
  width: number;
}

class CommentRenderer {
  width: number;
  height: number;
  context: CanvasRenderingContext2D;
  comments: CommentElement[] = [];

  updateCanvas(canvas: HTMLCanvasElement) {
    const { width, height } = canvas;
    this.width = width;
    this.height = height;
    this.context = canvas.getContext("2d");
  }

  push(comment: string) {
    this.comments.push({
      text: comment,
      pos: {
        x: this.width,
        // randomize position y.
        y: Math.random() * this.height,
      },
      width: this.measureText(comment),
    });
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.comments.forEach(c => {
      this.renderComment(c);
      c.pos.x -= 3;
    });
    this.comments = this.comments.filter(c => c.pos.x + c.width >= 0);
  }

  renderComment(comment: CommentElement) {
    this.context.font = `30px Quicksand, 游ゴシック体, Yu Gothic, YuGothic, ヒラギノ角ゴシック Pro, Hiragino Kaku Gothic Pro, メイリオ, Meiryo, Osaka, ＭＳ Ｐゴシック, MS PGothic, sans-serif`;
    this.context.strokeStyle = "white";
    this.context.lineWidth = 5;
    this.context.fillStyle = "black";
    this.context.strokeText(comment.text, comment.pos.x, comment.pos.y);
    this.context.fillText(comment.text, comment.pos.x, comment.pos.y);
  }

  measureText(text: string): number {
    return this.context.measureText(text).width;
  }
}
