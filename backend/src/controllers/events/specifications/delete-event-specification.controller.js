import { deleteEventSpecificationService } from "../../../services/events/specifications/delete-event-specification.service.js";

async function deleteEventSpecificationController(request, reply) {
    let { id } = request.params;

    await deleteEventSpecificationService({ id });

    return reply.status(204).send();
}

export {
    deleteEventSpecificationController
}