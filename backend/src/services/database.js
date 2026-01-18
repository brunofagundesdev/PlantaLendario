import "dotenv/config";
import postgres from "postgres";

export const database = postgres(process.env.DATABASE_URL, { ssl: "require" })

