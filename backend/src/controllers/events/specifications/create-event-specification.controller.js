import { createEventSpecificationService } from "../../../services/events/specifications/create-event-specification.service.js"

async function createEventSpecificationController(request, reply) {
    let { typeId } = request.params;
    let { body } = request;

    let eventSpecification = await createEventSpecificationService({ typeId, body });

    return reply.status(201).send(eventSpecification);
}

export {
    createEventSpecificationController
}