// Controllers
import locationController from "./location.controller.js";

import locationTypeRoute from "./type/location-type.route.js";

// // Middlewares
import ensureAuthenticated from "../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../middlewares/ensure-admin.middleware.js";

export default function locationRoute(app) {

    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, locationController.create);
    app.get("/:id", { preHandler: [ensureAuthenticated] }, locationController.get);
    app.get("/", { preHandler: [ensureAuthenticated] }, locationController.list);
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, locationController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, locationController.delete);

    app.register(locationTypeRoute, { prefix: "/types" });

}