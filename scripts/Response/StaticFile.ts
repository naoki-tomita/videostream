import { readFile, getContentType } from "../utils";
import { Response } from "express";
import { notFound } from "./404";

export async function staticFile({
  path,
  response,
}: {
  path: string;
  response: Response;
}) {
  try {
    const data = await readFile(path);
    response.writeHead(200, {
      "content-type": getContentType(path),
    });
    response.end(data);
  } catch (e) {
    notFound(response);
  }
}