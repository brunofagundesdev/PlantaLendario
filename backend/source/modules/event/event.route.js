// Controllers
import eventController from "./event.controller.js";

// // Type, Specifications e Options
import { eventTypeRoute } from "./type/event-type.route.js";
import { eventSpecificationRoute } from "./specification/event-specification.route.js";
import { eventOptionRoute } from "./option/event-option.route.js";

// // Middlewares
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated.middleware.js";
import { ensureAdmin } from "../../middlewares/ensure-admin.middleware.js";
import { ensureCanManageUser } from "../../middlewares/ensure-can-manage-user.middleware.js";

async function eventRoute(app) {

    //CRUD
    app.get("/", { preHandler: [] }, eventController.get);
    app.get("/:id", { preHandler: [] }, eventController.list);

    app.post("/", { preHandler: [] }, eventController.create);
    app.patch("/:id", { preHandler: [] }, eventController.update);
    app.delete("/:id", { preHandler: [] }, eventController.delete);

    app.register(eventTypeRoute, { prefix: "/types" });
    app.register(eventSpecificationRoute, { prefix: "/specifications" });
    app.register(eventOptionRoute, { prefix: "/options" });
}

export {
    eventRoute
}