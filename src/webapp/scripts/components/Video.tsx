import * as React from "react";
import "react-dom";

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
    return (
      <video
        ref="video"
        src={src} 
        width={width} 
        onPause={onPause} 
        onPlay={onPlay}
        webkit-playsinline playsinline
      >
      </video>
    );
  }

  now() {
    return this.refs.video.currentTime;
  }
}






// import { query } from "./Query";
// import { Observable, EventCallback } from "./Observable";








// export class Video extends Observable {
//   video: HTMLVideoElement;
//   constructor() {
//     super();
//     const id = query("id");
//     this.video = document.getElementById("video") as HTMLVideoElement;
//     this.video.setAttribute("src", `/apis/videos/${id}`);
//     this.initEvents();
//   }

//   initEvents() {
//     this.video.addEventListener("play", () => {
//       this.dispatch("play");
//     });
//     this.video.addEventListener("pause", () => {
//       this.dispatch("pause");
//     })
//   }

//   play() {
//     this.video.play();
//   }

//   pause() {
//     this.video.pause();
//   }

//   now() {
//     return this.video.currentTime;
//   }

//   onPlay(cb: EventCallback) {
//     this.on("play", cb);
//   }

//   onPause(cb: EventCallback) {
//     this.on("pause", cb);
//   }
// }