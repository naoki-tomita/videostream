import { createTable, insert, fileName, allRow } from "./scripts/Database/Video";

(async function() {
  // await createTable();
  // await insert("video.mp4");
  console.log(await fileName(1));
})();