import * as fs from "fs";
import { URL } from "url";
import * as path from "path";

export async function readdir(path: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  });
}

export async function readFile(path: string | number | Buffer | URL): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

export async function readFileStatus(path: string | Buffer | URL): Promise<fs.Stats> {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(path, (err, status) => {
      if (err) {
        return reject(err);
      }
      resolve(status);
    });
  });
}

export function getContentType(fileName: string) {
  const ext = path.extname(fileName);
  switch (ext) {
    case ".mp4":
      return "video/mp4";
    case ".html":
    case ".htm":
      return "text/html";
    default:
      return "text/plain";
  }
}

export function parseRange(rangeStr: string) {
  const [ type, range ] = rangeStr.split("=");
  const [ start, end ] = range.split("-").map(x => Number.parseInt(x, 10));
  return {
    start: isNaN(start) ? undefined : start,
    end: isNaN(end) ? undefined : end,
  };
}