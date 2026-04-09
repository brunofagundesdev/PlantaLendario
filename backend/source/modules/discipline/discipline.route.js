// Controllers
import disciplineController from "./discipline.controller.js";

// // Middlewares
import ensureAuthenticated from "../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../middlewares/ensure-admin.middleware.js";

import disciplineTeacherRoute from "../discipline-teacher/discipline-teacher.route.js";

export default function disciplineRoute(app) {

    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, disciplineController.create);
    app.get("/:id", { preHandler: [ensureAuthenticated] }, disciplineController.get);
    app.get("/", { preHandler: [ensureAuthenticated] }, disciplineController.list);
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, disciplineController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, disciplineController.delete);

    app.register(disciplineTeacherRoute, { prefix: "/:disciplineId/teachers" })
}