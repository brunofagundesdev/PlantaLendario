import { createEventTypeService } from "../../../services/events/types/create-event-type.service.js";

async function createEventTypeController(request, reply) {
    let { name } = request.body;

    await createEventTypeService({ name });

    return reply.status(201).send();
}

export {
    createEventTypeController
}