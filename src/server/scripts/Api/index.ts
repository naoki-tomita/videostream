import { Router } from "express";
import { router as commentsRouter } from "./Comment";

export const router = Router();
router.use("/comments", commentsRouter);