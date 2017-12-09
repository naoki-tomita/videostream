import { Video } from "./Video";
import { Comments } from "./Comment";

class App {
  video: Video;
  comment: Comments;
  constructor() {
    this.video = new Video();
    this.comment = new Comments(this.video);
    this.initEvents();
  }

  initEvents() {
    const play = document.getElementById("play");
    let playing = false;
    play.addEventListener("click", () => {
      if (playing) {
        this.video.pause();
        play.innerHTML = "play";
      } else {
        this.video.play();
        play.innerHTML = "pause";
      }
      playing = !playing;
    });
  }
}

(window as any).App = App;