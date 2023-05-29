import express from "express";
import fs from "fs";
import path from "path";

const config = JSON.parse(fs.readFileSync(path.resolve("config.json"), "utf-8")) as {
  port: number;
  rootDir: string;
};

const app = express();

app.get("/", (req, res) => {
  res.redirect("https://gart.sh/jpxs");
});

app.get("/:folder/:file", (req, res) => {
  const { folder, file } = req.params;

  if (!fs.existsSync(path.resolve(config.rootDir, folder, `${file}.zip`))) {
    res.sendStatus(404);
    return;
  }

  res.download(path.resolve(config.rootDir, folder, `${file}.zip`));
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
