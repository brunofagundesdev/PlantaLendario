import { getEventSpecificationService } from "../../../services/events/specifications/get-event-specification.service.js";

async function getEventSpecificationController(request, reply) {
    let { id } = request.params;

    let eventSpecification = await getEventSpecificationService({ id });

    return reply.status(200).send(eventSpecification);
}

export {
    getEventSpecificationController
}