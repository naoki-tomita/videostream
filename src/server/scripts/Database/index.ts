import { readdir } from "../utils";
import { exec, get, all } from "./Sqlite3";

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

export async function listVideo() {
  return await all(`SELECT * FROM file_table`);
}

export async function addComment(fileId: number, time: number, comment: string) {
  return await exec(`INSERT INTO comment_table (
    file_id, 
    time, 
    comment
  ) VALUES (
    ${fileId}, 
    ${time}, 
    "${comment}"
  )`);
}

export async function getComments(fileId: number) {
  return await all(`SELECT * FROM comment_table WHERE file_id=${fileId} ORDER BY time`);
}

export async function getComment(commentId: number) {
  return await all(`SELECT * FROM comment_table WHERE id=${commentId}`)
}