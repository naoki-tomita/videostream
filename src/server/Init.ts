import { createTable, fileName, addVideo } from "./scripts/Database/Video";
import { readdir } from "./scripts/utils";
import { basename } from "path";

(async function() {
  await createTable();
  const fileList = await readdir("./videos");
  fileList.forEach(async v => {
    await addVideo(basename(v));
  });
})();