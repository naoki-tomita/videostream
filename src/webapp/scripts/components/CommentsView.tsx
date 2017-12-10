import * as React from "react";
import "react-dom";
import { CSSProperties } from "react";

interface Comment {
  comment: string;
  time: number;
}

interface Props {
  now: () => number;
}

export class CommentsView extends React.Component<Props> {
  refs: {
    canvas: HTMLCanvasElement;
  }
  lastTime: number;
  renderer: CommentRenderer;
  comments: Comment[];

  constructor(props: Props, context?: any) {
    super(props, context);
    this.renderer = new CommentRenderer();
  }

  render() {
    // cover parent.
    const style: CSSProperties = {
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "100%",
      height: "100%",
    };
    return (
      <canvas ref="canvas" style={style}></canvas>
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
    const { canvas } = this.refs
    this.renderer.updateCanvas(canvas);
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderComments();
  }

  private renderComments() {
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
  }
}

class CommentRenderer {
  width: number;
  height: number;
  context: CanvasRenderingContext2D;
  comments: CommentElement[];

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
        y: Math.random() * this.height,
      }
    });
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height);
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
}
