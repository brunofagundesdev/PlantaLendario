import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", "..", ".env");
dotenv.config({ path: envPath });


const { database } = await import("../infra/database.js");

const schemaPath = path.join(__dirname, "..", "..", "..", "database", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

database.unsafe(schema)
.then(() => {
    console.log("Schema executado com sucesso")
})
.catch((error) => {
    console.error("Erro ao executar schema:", error)
})