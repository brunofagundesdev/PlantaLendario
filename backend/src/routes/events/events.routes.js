// Controllers
import { createEventController } from "../../controllers/events/create-event.controller.js";
// import { deleteEventController } from "../controllers/events/delete-event.controller.js";
// import { getEventsController } from "../controllers/events/get-events.controller.js";
// import { getEventController } from "../controllers/events/get-event.controller.js";
// import { patchEventController } from "../controllers/events/patch-event.controller.js";

// Type, Specifications e Options
import { eventTypeRoutes } from "./event-types.routes.js";
import { eventSpecificationRoutes } from "./event-specifications.routes.js";
import { eventOptionRoutes } from "./event-options.routes.js";

// Middlewares
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated.middleware.js";
import { ensureAdmin } from "../../middlewares/ensure-admin.middleware.js";
import { ensureCanManageUser } from "../../middlewares/ensure-can-manage-user.middleware.js";

async function eventRoutes(app) {

    //CRUD
    // app.get("/", { preHandler: [] }, getEventsController);
    // app.get("/:id", { preHandler: [] }, getEventController);

    // app.post("/", { preHandler: [] }, createEventController);
    // app.patch("/:id", { preHandler: [] }, patchEventController);
    // app.delete("/:id", { preHandler: [] }, deleteEventController);

    app.register(eventTypeRoutes, { prefix: "/types" });
    app.register(eventSpecificationRoutes, { prefix: "/specifications" });
    app.register(eventOptionRoutes, { prefix: "/options" });
}

export {
    eventRoutes
}