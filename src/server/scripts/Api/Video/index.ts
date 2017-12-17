import { Router } from "express";
import { progressiveResponse } from "./ProgressiveResponse";
import { fileName, listVideo } from "../../Database";
import { parseRange } from "../../utils";
import { router as commentRouter } from "./Comment";

export const router = Router();
// enable to get videoId where comment api too.
router.param("id", (req, res, next, id) => {
  (req as any).video = { id };
  next();
});
// route comment api.
router.use("/:id/comments", commentRouter);
// when specified only videoId, return video.
router.get("/:id", async (req, res, next) => {
  let rangeStr = req.headers.range;
  if (!rangeStr) {
    rangeStr = "bytes=0-";
  }
  if (Array.isArray(rangeStr)) {
    rangeStr = rangeStr[0];
  }
  const range = parseRange(rangeStr);
  const file = await fileName(req.params.id);
  const path = `videos/${file}`;
  progressiveResponse({ 
    path,
    range,
    response: res,
  });
});
// list video.
router.get("/", async (req, res, next) => {
  const list = listVideo();
  res.setHeader("content-type", "application/json; encoding=utf8");
  res.end(JSON.stringify(list));
});