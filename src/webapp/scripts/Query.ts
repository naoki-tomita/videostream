const queryStr = location.href.split("?")[1];
const queryObj: { [key: string]: string } = {};
queryStr.split("&").map(q => q.split("=")).forEach(q => queryObj[q[0]] = q[1]);

export function query(key: string) {
  return queryObj[key];
}