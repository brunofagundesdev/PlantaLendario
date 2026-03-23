// Controllers
import announcementController from "./announcement.controller.js";

// // Middlewares
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated.middleware.js";
import { ensureAdmin } from "../../middlewares/ensure-admin.middleware.js";

function announcementRoute(app) {

    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, announcementController.create);
    app.get("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, announcementController.get);
    app.get("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, announcementController.list);
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, announcementController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, announcementController.delete);
}

export {
    announcementRoute
}