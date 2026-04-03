// Controllers
import resourceController from "./resource.controller.js";

// // Middlewares
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated.middleware.js";
import { ensureAdmin } from "../../middlewares/ensure-admin.middleware.js";

function resourceRoute(app) {

    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, resourceController.create);
    app.get("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, resourceController.get);
    app.get("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, resourceController.list);
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, resourceController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, resourceController.delete);
}

export {
    resourceRoute
}