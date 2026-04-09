import eventOptionController from "./event-specification.controller.js";

// Middlewares
import ensureAuthenticated from "../../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../../middlewares/ensure-admin.middleware.js";

export default async function eventOptionRoute(app) {

    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventOptionController.create);
    app.get("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventOptionController.get);
    app.get("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventOptionController.list);
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventOptionController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventOptionController.delete);

}