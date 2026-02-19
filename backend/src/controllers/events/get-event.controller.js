import { getEventService } from "../../services/events/get-event.service.js";

async function getEventController(request, reply) {
    let { id } = request.params;

    let event = await getEventService({ id });

    return reply.status(200).send(event);
}

export {
    getEventController
}