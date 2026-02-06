import { patchEventTypeService } from "../../../services/events/types/patch-event-type.service.js";

async function patchEventTypeController(request, reply) {
    let { id } = request.params;
    let { body } = request;

    let eventType = await patchEventTypeService({id, body});
    return reply.status(200).send(eventType);
}

export {
    patchEventTypeController
}