import { deleteEventTypeService } from "../../../services/events/types/delete-event-type.service.js";

async function deleteEventTypeController(request, reply) {
    let { id } = request.params;

    await deleteEventTypeService({ id });

    return reply.status(204).send();
}

export {
    deleteEventTypeController
}