import * as React from "react";
import "react-dom";
import { CommentsView } from "./CommentsView";
import { Video } from "./Video";

interface Props {
  src: string;
}

class Root extends React.Component<Props> {
  refs: {
    video: Video,
  }

  render() {
    const { src } = this.props;
    return (
      <div>
        <span>
          <Video ref="video" src={src} width="520px"/>
          <CommentsView now={this.refs.video.now}/>
        </span>
        <Comment />
      </div>
    );
  }
}