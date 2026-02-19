import { getEventsService } from "../../services/events/get-events.service.js";

async function getEventsController(request, reply) {
    
    let events = await getEventsService();

    return reply.status(200).send(events);
}

export {
    getEventsController
}