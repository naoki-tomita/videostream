import { Router } from "express";
import { router as videoRouter } from "./Video";

export const router = Router();
router.use("/videos", videoRouter)