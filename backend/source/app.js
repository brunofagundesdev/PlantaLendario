import { fastify } from "fastify";

// imports do routes pra registrar cada rota com funcao
import { userRoute } from "./modules/user/user.route.js";
import { eventRoute } from "./modules/event/event.route.js";
import { roleRoute } from "./modules/role/role.route.js";
import { teacherRoute } from "./modules/teacher/teacher.route.js";
import { authRoute } from "./auth/auth.route.js";
import { announcementRoute } from "./modules/announcement/announcement.route.js";
// import { disciplineRoutes } from "./routes/disciplines.routes.js";
// import { lessonsRoutes } from "./routes/disciplines.routes.js";

const app = fastify({
  ignoreTrailingSlash: true
});


// registro de todas rotas
app.register(eventRoute, { prefix: "/events" });
app.register(userRoute, { prefix: "/users" });
app.register(authRoute, { prefix: "/auth" });
app.register(roleRoute, { prefix: "/roles" });
app.register(teacherRoute, { prefix: "/teachers" });
app.register(announcementRoute, { prefix: "/announcements" });

export default app;