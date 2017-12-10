
class CommentModel {
  async listComment({
    id,
  }: {
    id: number;
  }): Promise<Array<{
    comment: string;
    time: number;
  }>> {
    const list = await fetch(`/apis/videos/${id}/comments`);
    return await list.json() as Array<{comment: string, time: number}>;
  }

  async postComment({
    id, 
    comment, 
    time
  }: {
    id: number;
    comment: string;
    time: number;
  }) {
    const body = { comment, time };
    const headers = new Headers({ "content-type": "application/json" });
    return await fetch(`/apis/videos/${id}/comments`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  }
}