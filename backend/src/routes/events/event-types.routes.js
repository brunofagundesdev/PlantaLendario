import { createEventTypeController } from "../../controllers/events/types/create-event-type.controller.js";
import { getEventTypeController } from "../../controllers/events/types/get-event-type.controller.js";
import { getEventTypesController } from "../../controllers/events/types/get-event-types.controller.js";
import { patchEventTypeController } from "../../controllers/events/types/patch-event-type.controller.js";
import { deleteEventTypeController } from "../../controllers/events/types/delete-event-type.controller.js";

// Specifications integradas a types
import { getEventSpecificationsController } from "../../controllers/events/specifications/get-event-specifications.controller.js";
import { createEventSpecificationController } from "../../controllers/events/specifications/create-event-specification.controller.js";

async function eventTypeRoutes(app) { // /events/types
    app.get("/", { preHandler: [] }, getEventTypesController);
    app.get("/:id", { preHandler: [] }, getEventTypeController);

    app.post("/", { preHandler: [] }, createEventTypeController);
    app.patch("/:id", { preHandler: [] }, patchEventTypeController);
    app.delete("/:id", { preHandler: [] }, deleteEventTypeController);

    // specifications
    app.get("/:typeId/specifications", { preHandler: [] }, getEventSpecificationsController);
    app.post("/:typeId/specifications", { preHandler: [] }, createEventSpecificationController);
}

export {
    eventTypeRoutes
}