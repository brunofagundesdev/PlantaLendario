import { createEventTypeController } from "../../controllers/events/types/create-event-type.controller.js";
// import { getEventSpecificationController } from "../../controllers/events/types/get-event-type.controller.js";
// import { getEventSpecificationsController } from "../../controllers/events/types/get-event-types.controller.js";
// import { patchEventSpecificationController } from "../../controllers/events/types/patch-event-type.controller.js";
// import { deleteEventSpecificationController } from "../../controllers/events/types/delete-event-type.controller.js";

import { eventSpecificationRoutes } from "./specifications.routes.js";

async function eventTypeRoutes(app) { // /events/types
    // app.get("/", { preHandler: [] }, getEventTypesController);
    // app.get("/:id", { preHandler: [] }, getEventTypeController);

    app.post("/", { preHandler: [] }, createEventTypeController);
    // app.patch("/:id", { preHandler: [] }, patchEventTypeController);
    // app.delete("/:id", { preHandler: [] }, deleteEventTypeController);

    app.register(eventSpecificationRoutes, { prefix: "/:typeId/specifications" });
}

export {
    eventTypeRoutes
}