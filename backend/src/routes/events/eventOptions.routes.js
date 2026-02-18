import { getEventOptionController } from "../../controllers/events/options/get-event-option.controller.js";
import { patchEventOptionController } from "../../controllers/events/options/patch-event-option.controller.js";
import { deleteEventOptionController } from "../../controllers/events/options/delete-event-option.controller.js";
import { getEventOptionByNameRepository } from "../../repository/events/options/get-event-option-by-name.repository.js";
import { createEventOptionRepository } from "../../repository/events/options/create-event-options.repository.js";


async function eventOptionsRoutes(app) { // /events/options

    app.get("/:id", { preHandler: [] }, getEventOptionController);
    app.get ("/", { preHandler: [] }, createEventOptionRepository);
    app.patch("/:id", { preHandler: [] }, patchEventOptionController);
    app.delete("/:id", { preHandler: [] }, deleteEventOptionController);
}

export {
    eventOptionsRoutes
}