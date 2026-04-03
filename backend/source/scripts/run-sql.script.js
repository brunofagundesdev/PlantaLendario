import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const { database } = await import("../infra/database.js");

import fs from "fs";

async function runSQL(archive) {
  const schemaPath = path.join(__dirname, ...archive.split("/"));
  const schema = fs.readFileSync(schemaPath, "utf-8");

  database.unsafe(schema)
    .then(() => console.log("SQL executado com sucesso"))
    .catch(console.error);
}

await runSQL("../../../database/updates/list-to-resource.sql");
