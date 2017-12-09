import * as express from "express";
import * as bodyParser from "body-parser";
import { progressiveResponse } from "./scripts/Video/ProgressiveResponse";
import { router as staticFileRouter } from "./scripts/StaticFile";
import { router as videoRouter } from "./scripts/Video";
import { router as apiRouter } from "./scripts/Api";
import { fileName, addComment, getComments } from "./scripts/Database/Video";

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/apps", staticFileRouter);
app.use("/videos", videoRouter);
app.use("/apis", apiRouter);

app.listen(8000, "0.0.0.0");
