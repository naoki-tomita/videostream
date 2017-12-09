import { addComment, getComments } from "../Database/Video";
import { Router } from "express";

export const router = Router();
router.post("/:id", (req, res) => {
  const id = req.params.id;
  const { comment, time } = req.body;
  addComment(id, time, comment);
  res.setHeader("content-type", "application/json; encoding=utf8");
  res.end();
});

router.get("/:id",async (req, res) => {
  const id = req.params.id;
  const comments = await getComments(id);
  res.setHeader("content-type", "application/json; encoding=utf8");
  res.end(JSON.stringify(comments));
});