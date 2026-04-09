// Controller
import teacherController from "./teacher.controller.js";

import ensureAdmin from "../../middlewares/ensure-admin.middleware.js";
import ensureAuthenticated from "../../middlewares/ensure-authenticated.middleware.js";

export default async function teacherRoute(app) {

    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, teacherController.create);
    app.get("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, teacherController.get);
    app.get("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, teacherController.list);

    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, teacherController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, teacherController.delete);

}