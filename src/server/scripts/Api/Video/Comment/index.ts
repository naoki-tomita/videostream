import { addComment, getComments, getComment } from "../../../Database";
import { Router } from "express";


export const router = Router();
// post comment.
router.post("/", (req, res) => {
  const id = (req as any).video.id;
  const { comment, time } = req.body;
  addComment(id, time, comment);
  res.setHeader("content-type", "application/json; encoding=utf8");
  res.end();
});

// get comment.
router.get("/",async (req, res) => {
  const id = (req as any).video.id;
  const comments = await getComments(id);
  res.setHeader("content-type", "application/json; encoding=utf8");
  res.end(JSON.stringify(comments));
});

router.get("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const comments = await getComment(commentId);
  res.setHeader("content-type", "application/json; encoding=utf8");
  res.end(JSON.stringify(comments));
})