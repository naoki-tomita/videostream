import { Router } from "express";
import { staticFile } from "../StaticFile/index";

export const router = Router();
router.get("/",async (req, res, next) => {
  await staticFile({
    path: "./pub/app.html",
    response: res,
  });
});

router.get("/:id", (req, res, next) => {
  // renderable html.
});