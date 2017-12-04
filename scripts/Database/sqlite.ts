import { Database, Statement } from "sqlite3";
const db = new Database("./db.db");
export async function get(sql: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    db.get(sql, (err: Error, row: any) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}

export async function exec(sql: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    db.exec(sql, (err: Error) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}