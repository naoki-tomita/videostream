import * as express from "express";
import * as bodyParser from "body-parser";
import { router as apiRouter } from "./scripts/Api";
import { router as videoRouter } from "./scripts/Api/Video";
import { progressiveResponse } from "./scripts/Api/Video/ProgressiveResponse";
import { router as appRouter } from "./scripts/App";
import { router as staticFileRouter } from "./scripts/StaticFile";

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/apps", appRouter);
app.use("/pub", staticFileRouter);
app.use("/apis", apiRouter);

app.listen(8000, "0.0.0.0");
