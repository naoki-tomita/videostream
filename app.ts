import * as express from "express";
import { parseRange } from "./scripts/utils";
import { progressiveResponse } from "./scripts/Response/ProgressiveResponse";
import { staticFile } from "./scripts/Response/StaticFile";
import { fileName } from "./scripts/Database/Video";

const app = express();

function staticRouter(base: string) {
  return async (req: express.Request, res: express.Response, next: express.RequestHandler) => {
    const path = `${base}/${req.params.file}`;
    await staticFile({
      path,
      response: res,
    });
  }
}
app.get("/app/js/:file", staticRouter("app/js"));
app.get("/app/:file", staticRouter("app"));

app.get("/video/:id", async (req, res, next) => {
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

app.post("/comment/:id", async (req, res, next) => {
  
});

app.listen(8000, "0.0.0.0");
