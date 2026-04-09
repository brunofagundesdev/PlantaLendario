import disciplineTeacherController from "./discipline-teacher.controller.js";
// import ensureAdmin
import ensureAuthenticated from "../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../middlewares/ensure-admin.middleware.js";

export default async function disciplineTeacherRoute(app) { // /discipline/:id/teachers
    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, disciplineTeacherController.assign);
    app.delete("/:teacherId", { preHandler: [ensureAuthenticated, ensureAdmin] }, disciplineTeacherController.deassign);
}