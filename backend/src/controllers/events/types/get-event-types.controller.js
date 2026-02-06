import { getEventTypesService } from "../../../services/events/types/get-event-types.service.js";

async function getEventTypesController(request, reply) {
    
    let eventTypes = await getEventTypesService();

    return reply.status(200).send(eventTypes);
}

export {
    getEventTypesController
}