import { deleteEventSpecificationService } from "../../../services/events/options/delete-event-option.service.js";

async function deleteEventOptionController(request, reply) {
    let { id } = request.params;

    await deleteEventSpecificationService({ id });

    return reply.status(204).send();
}

export {
    deleteEventOptionController
}