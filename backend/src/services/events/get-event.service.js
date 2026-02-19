import { getEventRepository } from "../../repository/events/get-event.repository.js";

import { validate as uuidValidate } from "uuid";

// Errors
import * as EventErrors from "../../errors/events/event.errors.js";

async function getEventService({ id }) {

    if (!uuidValidate(id)) {
        throw new EventErrors.EventIdInvalidError();
    }

    let event = await getEventRepository({ id });

    if (!event) {
        throw new EventErrors.EventNotFoundError();
    }

    return event;
}

export {
    getEventService
}