import eventSpecificationController from "./event-specification.controller.js";

import eventOptionController from "../option/event-option.controller.js";

// Middlewares
import ensureAuthenticated from "../../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../../middlewares/ensure-admin.middleware.js";

export default async function eventSpecificationRoute(app) {

    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventSpecificationController.create);
    app.get("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventSpecificationController.get);
    app.get("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventSpecificationController.list);
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventSpecificationController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventSpecificationController.delete);

    // Options
    app.get("/:specificationId/options", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventOptionController.list);
    app.post("/:specificationId/options", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventOptionController.create);
}