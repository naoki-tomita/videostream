import { Observable } from "./Observable";

interface Comment {
  comment: string;
  time: number;
}

export class CommentModel extends Observable {
  list: Comment[];
  id: number;
  constructor(options: { 
    id: number 
  }) {
    super();
    this.id = options.id;
  }

  async listComment() {
    const id = this.id;
    const list = await fetch(`/apis/videos/${id}/comments`);
    this.list = await list.json() as Comment[];
    this.dispatch("list");
  }

  async postComment(options: {
    comment: string;
    time: number;
  }) {
    const id = this.id;
    const { comment, time } = options;
    const body = { comment, time };
    const headers = new Headers({ "content-type": "application/json" });
    await fetch(`/apis/videos/${id}/comments`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    this.list.push(body);
    this.dispatch("comment", [ body ]);
  }

  onListUpdate(cb: () => void) {
    this.on("list", cb);
  }

  onCommentPost(cb: (param: Comment) => void) {
    this.on("comment", cb);
  }
}