import * as React from "react";

interface Props {
  src: string;
  width: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export class Video extends React.Component<Props> {
  refs: {
    video: HTMLVideoElement
  }

  render() {
    const { src, width, onPause, onPlay } = this.props;
    const style: React.CSSProperties = {
      position: "relative"
    }
    return (
      <video
        style={style}
        ref="video"
        src={src} 
        width={width} 
        onPause={onPause} 
        onPlay={onPlay}
        webkit-playsinline="true"
        playsInline
      >
      </video>
    );
  }

  now() {
    return this.refs.video.currentTime;
  }

  play() {
    this.refs.video.play();
  }

  pause() {
    this.refs.video.pause();
  }
}
