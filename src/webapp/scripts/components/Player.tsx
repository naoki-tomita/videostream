import * as React from "react";
import { CommentsView } from "./CommentsView";
import { Video } from "./Video";
import { RaisedButton } from "material-ui";
import { CommentModel } from "../models/Comment";

interface Props {
  src: string;
  commentModel: CommentModel;
}

interface State {
  playLabel: "Play" | "Pause";
}

export class Player extends React.Component<Props, State> {
  refs: {
    video: Video,
  }

  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      playLabel: "Play",
    };
  }

  now() {
    const { video } = this.refs;
    return video.now();
  }

  handlePlay() {
    this.setState({
      playLabel: "Pause",
    });
  }

  handlePause() {
    this.setState({
      playLabel: "Play",
    });
  }

  render() {
    const { src, commentModel } = this.props;
    const { playLabel } = this.state;
    const style: React.CSSProperties = {
      position: "relative",
      display: "inline-block",
    }
    return (
      <div>
        <div style={style}>
          <Video 
            ref="video" 
            src={src} 
            width="520px" 
            onPlay={this.handlePlay.bind(this)} 
            onPause={this.handlePause.bind(this)}
          />
          <CommentsView 
            now={this.now.bind(this)}
            commentModel={commentModel}
          />
        </div>
        <div>
          <RaisedButton 
            label={playLabel} 
            onClick={this.onPlayClick.bind(this)} 
          />
        </div>
      </div>
    );
  }

  onPlayClick() {
    const { video } = this.refs;
    if (this.state.playLabel === "Play") {
      video.play();
    } else {
      video.pause();
    }
  }
}