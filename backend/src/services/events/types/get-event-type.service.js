import { getEventTypeRepository } from "../../../repository/events/types/get-event-type.repository.js";

import * as EventTypeErrors from "../../../errors/events/event-type.errors.js";

import { validateSerial } from "../../../utils/validate-serial.js";

async function getEventTypeService({ id }) {

    // Id
    if (!validateSerial(id)) {
        throw new EventTypeErrors.EventTypeIdInvalidError();
    }

    let eventType = await getEventTypeRepository({ id });

    if (!eventType) {
        throw new EventTypeErrors.EventTypeNotFoundError();
    }

    return eventType;
}

export {
    getEventTypeService
}