import * as socket from "socket.io";
import * as express from "express";
import * as fs from "fs";
import { URL } from "url";

const app = express();
const server = socket(8080);

async function readFile(path: string | number | Buffer | URL) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

async function readFileStatus(path: string | Buffer | URL): Promise<fs.Stats> {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(path, (err, status) => {
      if (err) {
        return reject(err);
      }
      resolve(status);
    });
  });
}

async function readFileStream(options: {
  path: string | Buffer | URL; 
  range: {
    start: number;
    end: number;
  };
  writeStream: (data: string) => void;
}) {
  const { path, range, writeStream } = options;
  const { start, end } = range;

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(path, {
      start: isNaN(start) ? 0 : start,
      end: isNaN(end) ? undefined : end,
    });
    let wrote = 0;
    stream.on("data", (data) => {
      wrote += data.length;
      writeStream(data);
    });
    stream.on("close", () => {
      console.log("data sent: " + wrote);
      resolve();
    });
    stream.on("error", (e) => {
      stream.close();
      reject(e);
    });
  });
}

function parseRange(rangeStr: string) {
  const [ type, range ] = rangeStr.split("=");
  const [ start, end ] = range.split("-").map(x => Number.parseInt(x, 10));
  return {
    start,
    end,
  };
}

app.get("/app", async (req, res, next) => {
  console.log("connect");
  const data = await readFile("app.html");
  res.setHeader("content-type", "text/html");
  res.end(data);
});

const FILE_NAME = "video.mov"

app.get("/size", async (req, res, next) => {
  const { size } = await readFileStatus(FILE_NAME);
  res.writeHead(200, {
    "content-type": "application/json"
  });
  res.end(JSON.stringify({size}));
});

app.get("/video", async (req, res, next) => {
  let rangeStr = req.headers.range;
  if (Array.isArray(rangeStr)) {
    rangeStr = rangeStr[0];
  }
  const { size } = await readFileStatus(FILE_NAME);
  const range = parseRange(rangeStr);
  // res.writeHead(206, {
  //   "content-type": "video/mp4",
  //   "content-range": "bytes " + range.start + "-" + size + "/" + size,
  //   "content-length": size - range.start,
  // });
  res.writeHead(200, {
    "content-type": "video/mov",
    "content-range": "bytes " + range.start + "-" + size + "/" + size,
    "content-length": size - range.start,
  });
  await readFileStream({ 
    path: FILE_NAME, 
    range,
    writeStream: res.write.bind(res)
  });
  res.end();
});

app.listen(8000, "0.0.0.0");

server.on("connection", s => {});