import { createTable, fileName, addVideo } from "./scripts/Database/Video";

(async function() {
  await createTable();
  await addVideo("video.mp4");
})();