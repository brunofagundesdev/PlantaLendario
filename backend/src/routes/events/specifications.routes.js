import { createEventSpecificationController } from "../../controllers/events/specifications/create-event-specification.controller.js";
// import { getEventSpecificationController } from "../../controllers/events/specifications/get-event-specification.controller.js";
// import { getEventSpecificationsController } from "../../controllers/events/specifications/get-event-specifications.controller.js";
// import { patchEventSpecificationController } from "../../controllers/events/specifications/patch-event-specification.controller.js";
// import { deleteEventSpecificationController } from "../../controllers/events/specifications/delete-event-specification.controller.js";



async function eventSpecificationRoutes(app) { // /events/specifications
    // app.get("/", { preHandler: [] }, getEventSpecificationsController);
    // app.get("/:id", { preHandler: [] }, getEventSpecificationController);

    app.post("/", { preHandler: [] }, createEventSpecificationController);
    // app.patch("/:id", { preHandler: [] }, patchEventSpecificationController);
    // app.delete("/:id", { preHandler: [] }, deleteEventSpecificationController);
}

export {
    eventSpecificationRoutes
}