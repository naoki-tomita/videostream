import { Response } from "express";
import { getContentType, readFile } from "../utils";

export async function notFound(response: Response) {
  const path = "./app/404.html";
  const data = await readFile(path);
  response.writeHead(404, {
    "content-type": getContentType(path),
  });
  response.end(data);
}
