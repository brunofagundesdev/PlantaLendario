import { createEventSpecificationService } from "../../../services/events/specifications/create-event-specification.service.js"

async function createEventSpecificationController(request, reply) {
    let { typeId, name } = request.body;

    let eventSpecification = await createEventSpecificationService({ typeId, name });

    return reply.status(201).send(eventSpecification);
}

export {
    createEventSpecificationController
}