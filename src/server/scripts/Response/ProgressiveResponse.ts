import { Response } from "express";
import { createReadStream } from "fs";
import { readFileStatus, getContentType } from "../utils";
import { notFound } from "./404";

export async function progressiveResponse({
  path,
  range,
  response,
}: {
  path: string;
  range: {
    start: number;
    end?: number;
  };
  response: Response;
}) {
  try {
    const { size } = await readFileStatus(path);
    const { start, end = size - 1 } = range;
    const contentLength = end - start + 1;

    response.writeHead(206, {
      "accept-ranges": "bytes",
      "content-type": getContentType(path),
      "content-range": `bytes ${start}-${end}/${size}`,
      "content-length": contentLength,
    });

    return new Promise((resolve, reject) => {
      const stream = createReadStream(path, {
        start,
        end,
      });
      stream.on("data", (d) => {
        response.write(d);
      });
      stream.on("close", () => {
        response.end();
        resolve();
      });
      stream.on("error", (e) => {
        reject(e);
      });
    });
  } catch (e) {
    notFound(response);
  }
}
