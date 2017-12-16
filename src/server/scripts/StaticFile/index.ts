import { join } from "path";
import { Response, Router } from "express";
import { readFile, getContentType } from "../utils";
import { notFound } from "../Error/404";

export const router = Router();
router.use((req, res, next) => {
  const path = join("./pub", req.path);
  staticFile({path, response: res});
});

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
      "content-type": `${getContentType(path)}; charset=utf8`,
    });
    response.end(data);
  } catch (e) {
    console.error(e);
    notFound(response);
  }
}