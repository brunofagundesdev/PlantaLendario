import eventTypeController from "./event-type.controller.js";

import eventSpecificationController from "../specification/event-specification.controller.js";

async function eventTypeRoute(app) { // /events/types

    app.post("/", { preHandler: [] }, eventTypeController.create);
    app.get("/:id", { preHandler: [] }, eventTypeController.get);
    app.get("/", { preHandler: [] }, eventTypeController.list);
    app.patch("/:id", { preHandler: [] }, eventTypeController.update);
    app.delete("/:id", { preHandler: [] }, eventTypeController.delete);
    
    // Specifications
    app.get("/:typeId/specifications", { preHandler: [] }, eventSpecificationController.list);
    app.post("/:typeId/specifications", { preHandler: [] }, eventSpecificationController.create);
}

export {
    eventTypeRoute
}