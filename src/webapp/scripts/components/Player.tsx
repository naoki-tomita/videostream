import * as React from "react";
import { CommentsView } from "./CommentsView";
import { Video } from "./Video";
import { Button, Grid } from "semantic-ui-react";
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

  get currentTime() {
    const { video } = this.refs;
    return video.currentTime;
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
      <Grid>
        <Grid.Row centered={true}>
          <Grid.Column>
            <div style={style}>
              <Video
                ref="video"
                src={src}
                onPlay={this.handlePlay.bind(this)}
                onPause={this.handlePause.bind(this)}
              />
              <CommentsView 
                now={() => this.currentTime}
                commentModel={commentModel}
              />
              </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button onClick={this.onPlayClick.bind(this)}>
              {playLabel}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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