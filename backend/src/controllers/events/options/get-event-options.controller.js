import { getEventOptionsService } from "../../../services/events/options/get-event-options.service.js";

async function getEventOptionsController(request, reply) {
    let { specificationId } = request.params;
    let eventOptions = await getEventOptionsService({ specificationId });

    return reply.status(200).send(eventOptions);
}

export {
    getEventOptionsController
}