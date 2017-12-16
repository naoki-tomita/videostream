import * as React from "react";

interface Props {
  src: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export class Video extends React.Component<Props> {
  refs: {
    video: HTMLVideoElement
  }

  render() {
    const { src, onPause, onPlay } = this.props;
    const style: React.CSSProperties = {
      position: "relative"
    }
    return (
      <video
        style={style}
        ref="video"
        width="100%"
        src={src}
        onPause={onPause} 
        onPlay={onPlay}
        webkit-playsinline="true"
        playsInline
      >
      </video>
    );
  }

  get currentTime() {
    return this.refs.video.currentTime;
  }

  play() {
    this.refs.video.play();
  }

  pause() {
    this.refs.video.pause();
  }
}
