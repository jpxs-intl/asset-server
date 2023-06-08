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

app.get("/world", (req, res) => {
  res.sendFile(path.resolve("./assets/world.html"));
});

app.get("/world/credits", (req, res) => {
  res.sendFile(path.resolve("./assets/credits.html"));
});

app.get("/world/signs/:file", (req, res) => {
  if (!fs.existsSync(path.resolve("./assets/signs", `${req.params.file}.png`))) {
    res.sendStatus(404);
    return;
  }

  res.sendFile(path.resolve("./assets/signs", `${req.params.file}.png`));

});
// assets

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
