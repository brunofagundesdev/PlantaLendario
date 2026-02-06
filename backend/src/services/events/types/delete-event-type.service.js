import { deleteEventTypeRepository } from "../../../repository/events/types/delete-event-type.repository.js";
import { getEventTypeRepository } from "../../../repository/events/types/get-event-type.repository.js";

async function deleteEventTypeService({ id }) {

    id = Number(id);
    // Id
    if (!Number.isInteger(id)) {
        throw new EventTypeErrors.EventTypeIdInvalidError();
    }

    let eventType = await getEventTypeRepository({ id });

    if (!eventType) {
        throw new EventTypeErrors.EventTypeNotFoundError();
    }

    await deleteEventTypeRepository({ id });

    return;
}

export {
    deleteEventTypeService
}