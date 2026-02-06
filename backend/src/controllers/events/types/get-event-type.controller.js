import { getEventTypeService } from "../../../services/events/types/get-event-type.service.js";

async function getEventTypeController(request, reply) {
    let { id } = request.params;

    let eventType = await getEventTypeService({ id });

    return reply.status(200).send(eventType);
}

export {
    getEventTypeController
}