import express from "express";
import files from "./routes/fs.mjs";
import databases from "./routes/databases.mjs";
import services from "./routes/api.mjs";
import download from "./routes/download.mjs";
import logger from "./logger.mjs";
import cors from "cors";

const app = express();

app.use(cors());
app.use(limit);
app.use(express.static(path));
app.use(`/api/files`, files);
app.use(`/api/db`, databases);
app.use(`/api/services`, services);
app.use(`/api/download`, download);

app.get("(/*)?", (req, res) => res.sendFile(`/build/index.html`));

app.listen(8080, () => logger.info(`Backend ready`));
