import { fastify } from "fastify";

// imports do routes pra registrar cada rota com funcao
import { userRoutes } from "./routes/users.routes.js";
import { eventRoutes } from "./routes/events.routes.js";
import { assessmentsRoutes } from "./routes/assessments.routes.js";
import { disciplineRoutes } from "./routes/disciplines.routes.js";
import { lessonsRoutes } from "./routes/disciplines.routes.js";
import { filesRoutes } from "./routes/files.routes.js";
import { announcementsRoutes } from "./routes/announcements.routes.js";

const app = fastify();

// registro de todas rotas
app.register(eventRoutes, { prefix: "/events"});

export default app;