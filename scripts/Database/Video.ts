import { readdir } from "../utils";
import { exec, get } from "./sqlite";

export async function createTable() {
  await createFileTable();
  await createCommentTable();
}

async function createFileTable() {
  await exec(`CREATE TABLE file_table (
    id INTEGER NOT NULL PRIMARY KEY,
    file_name TEXT
  )`);
}

async function createCommentTable() {
  await exec(`CREATE TABLE comment_table (
    id INTEGER NOT NULL PRIMARY KEY,
    file_id INTEGER,
    time INTEGER,
    comment TEXT
  )`);
}

export async function addVideo(fileName: string) {
  await exec(`INSERT INTO file_table (
    file_name
  ) VALUES (
    "${fileName}"
  )`);
}

export async function fileName(id: number) {
  const { file_name } = await get(`SELECT * FROM file_table WHERE id=${id}`);
  return file_name;
}

export async function addComment(fileId: number, time: number, comment: string) {
  await exec(`INSERT INTO comment_table (
    file_id, 
    time, 
    comment
  ) VALUES (
    ${fileId}, 
    ${time}, 
    "${comment}"
  )`);
}