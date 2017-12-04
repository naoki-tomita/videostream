import { readdir } from "../utils";
import { createHash } from "crypto";
import { exec, get } from "./sqlite";

export async function createTable() {
  await exec(`CREATE TABLE file_table (
    id INTEGER NOT NULL PRIMARY KEY,
    file_name TEXT
  )`);
}

export async function insert(fileName: string) {
  await exec(`INSERT INTO file_table (file_name) VALUES ("${fileName}")`);
}

export async function fileName(id: number) {
  const { file_name } = await get(`SELECT * FROM file_table WHERE id=${id}`);
  return file_name;
}

export async function allRow() {
  return await get(`SELECT * FROM file_table`);
}