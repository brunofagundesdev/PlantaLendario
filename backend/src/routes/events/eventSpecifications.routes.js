import { getEventSpecificationController } from "../../controllers/events/specifications/get-event-specification.controller.js";
import { patchEventSpecificationController } from "../../controllers/events/specifications/patch-event-specification.controller.js";
import { deleteEventSpecificationController } from "../../controllers/events/specifications/delete-event-specification.controller.js";

// import { getEventOptionsController } from "../../controllers/events/options/get-event-options.controller.js";
// import { createEventOptionController } from "../../controllers/events/options/create-event-option.controller.js";

async function eventSpecificationRoutes(app) { // /events/specifications

    app.get("/:id", { preHandler: [] }, getEventSpecificationController);

    app.patch("/:id", { preHandler: [] }, patchEventSpecificationController);
    app.delete("/:id", { preHandler: [] }, deleteEventSpecificationController);

    // Options
    // app.get("/:specificationId/specifications", { preHandler: [] }, getEventOptionsController);
    // app.post("/:specificationId/specifications", { preHandler: [] }, createEventOptionController);

}

export {
    eventSpecificationRoutes
}