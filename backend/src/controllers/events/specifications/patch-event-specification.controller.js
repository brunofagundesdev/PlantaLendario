import { patchEventSpecificationService } from "../../../services/events/specifications/patch-event-specification.service.js";

async function patchEventSpecificationController(request, reply) {
    let { id } = request.params;
    let { name } = request.body;

    let eventSpecification = await patchEventSpecificationService({ id, name });
    return reply.status(200).send(eventSpecification);
}

export {
    patchEventSpecificationController
}