import { getEventOptionController } from "../../controllers/events/options/get-event-option.controller.js";
import { patchEventOptionController } from "../../controllers/events/options/patch-event-option.controller.js";
import { deleteEventOptionController } from "../../controllers/events/options/delete-event-option.controller.js";

async function eventOptionsRoutes(app) { // /events/options

    app.get("/:id", { preHandler: [] }, getEventOptionController);

    app.patch("/:id", { preHandler: [] }, patchEventOptionController);
    app.delete("/:id", { preHandler: [] }, deleteEventOptionController);
}

export {
    eventOptionsRoutes
}