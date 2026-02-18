import { createEventOptionService } from "../../../services/events/options/create-event-option.service.js"

async function createEventOptionController(request, reply) {
    let { specificationId } = request.params;
    let { name } = request.body;

    let eventOption = await createEventOptionService({ specificationId, name });

    return reply.status(201).send(eventOption);
}

export {
    createEventOptionController
}