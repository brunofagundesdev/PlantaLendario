import postgres from "postgres";
const database = postgres(process.env.DATABASE_URL, { ssl: "require" })

export { database };

