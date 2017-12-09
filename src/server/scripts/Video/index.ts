import { Router } from "express";
import { progressiveResponse } from "./ProgressiveResponse";
import { fileName } from "../Database/Video";
import { parseRange } from "../utils";

export const router = Router();
router.get("/:id",async (req, res, next) => {
  let rangeStr = req.headers.range;
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