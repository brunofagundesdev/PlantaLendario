import { getEventSpecificationsRepository } from "../../../repository/events/specifications/get-event-specifications.repository.js";

import * as EventTypeErrors from "../../../errors/events/event-type.errors.js";

import { validateSerial } from "../../../utils/validate-serial.js";
import { getEventTypeRepository } from "../../../repository/events/types/get-event-type.repository.js";

async function getEventSpecificationsService({ typeId }) {

    if (!validateSerial(typeId)) {
        throw new EventTypeErrors.EventTypeIdInvalidError();
    }

    let eventType = await getEventTypeRepository({ id: typeId });
    if (!eventType) {
        throw new EventTypeErrors.EventTypeNotFoundError();
    }

    let eventSpecifications = await getEventSpecificationsRepository({ typeId });
    return eventSpecifications;
}

export {
    getEventSpecificationsService
}