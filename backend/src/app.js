import { fastify } from "fastify";

// imports do routes pra registrar cada rota com funcao
import { userRoutes } from "./routes/users.routes.js";
import { eventRoutes } from "./routes/events/events.routes.js";
import { roleRoutes } from "./routes/roles.routes.js";
import { teacherRoutes } from "./routes/teachers.routes.js";
// import { disciplineRoutes } from "./routes/disciplines.routes.js";
// import { lessonsRoutes } from "./routes/disciplines.routes.js";
// import { filesRoutes } from "./routes/files.routes.js";
// import { announcementsRoutes } from "./routes/announcements.routes.js";

const app = fastify({
  ignoreTrailingSlash: true
});


// registro de todas rotas
app.register(eventRoutes, { prefix: "/events" });
app.register(userRoutes, { prefix: "/users" });
app.register(roleRoutes, { prefix: "/roles" });
app.register(teacherRoutes, { prefix: "/teachers" });

export default app;