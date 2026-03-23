import "dotenv/config.js";
import app from "./app.js";

app.listen({
    host: "0.0.0.0",
    port: process.env.PORT
});