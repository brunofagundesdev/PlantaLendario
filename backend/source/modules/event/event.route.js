// Controllers
import eventController from "./event.controller.js";

// // Type, Specifications e Options
import eventTypeRoute from "./type/event-type.route.js";
import eventSpecificationRoute from "./specification/event-specification.route.js";
import eventOptionRoute from "./option/event-option.route.js";

// // Middlewares
import ensureAuthenticated from "../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../middlewares/ensure-admin.middleware.js";

export default async function eventRoute(app) {
    //CRUD
    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventController.create);
    app.get("/", { preHandler: [ensureAuthenticated] }, eventController.get);
    app.get("/:id", { preHandler: [ensureAuthenticated] }, eventController.list);
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, eventController.delete);
    // Dependências
    app.register(eventTypeRoute, { prefix: "/types" });
    app.register(eventSpecificationRoute, { prefix: "/specifications" });
    app.register(eventOptionRoute, { prefix: "/options" });
}