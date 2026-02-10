import { getEventSpecificationController } from "../../controllers/events/specifications/get-event-specification.controller.js";
import { patchEventSpecificationController } from "../../controllers/events/specifications/patch-event-specification.controller.js";
import { deleteEventSpecificationController } from "../../controllers/events/specifications/delete-event-specification.controller.js";

// import { eventOptionsRoutes } from "./options.routes.js";


async function eventSpecificationRoutes(app) { // /events/types/:typeId/specifications

    app.get("/:id", { preHandler: [] }, getEventSpecificationController);

    app.patch("/:id", { preHandler: [] }, patchEventSpecificationController);
    app.delete("/:id", { preHandler: [] }, deleteEventSpecificationController);

}

export {
    eventSpecificationRoutes
}