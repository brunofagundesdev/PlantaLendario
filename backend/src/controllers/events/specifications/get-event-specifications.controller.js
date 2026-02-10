import { getEventSpecificationsService } from "../../../services/events/specifications/get-event-specifications.service.js";

async function getEventSpecificationsController(request, reply) {
    let { typeId } = request.params;
    let eventSpecifications = await getEventSpecificationsService({ typeId });

    return reply.status(200).send(eventSpecifications);
}

export {
    getEventSpecificationsController
}