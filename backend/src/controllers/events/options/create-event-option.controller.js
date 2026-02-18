import { createEventSpecificationService } from "../../../services/events/options/create-event-option.service.js"

async function createEventSpecificationController(request, reply) {
    let { typeId } = request.params;
    let { name } = request.body;

    let eventSpecification = await createEventSpecificationService({ typeId, name });

    return reply.status(201).send(eventSpecification);
}

export {
    createEventSpecificationController
}