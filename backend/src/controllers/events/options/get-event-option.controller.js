import { getEventOptionService } from "../../../services/events/options/get-event-option.service.js";

async function getEventOptionController(request, reply) {
    let { id } = request.params;

    let eventOption = await getEventOptionService({ id });

    return reply.status(200).send(eventOption);
}

export {
    getEventOptionController
}