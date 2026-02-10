import { getEventSpecificationRepository } from "../../../repository/events/specifications/get-event-specification.repository.js";

import { validateSerial } from "../../../utils/validate-serial.js";

import * as EventSpecificationsErrors from "../../../errors/events/event-specifications.errors.js";

async function getEventSpecificationService({ id }) {

    if (!validateSerial(id)) {
        throw new EventSpecificationsErrors.EventSpecificationIdInvalidError();
    }

    let eventSpecificaton = await getEventSpecificationRepository({ id });

    if(!eventSpecificaton){
        throw new EventSpecificationsErrors.EventSpecificationNotFoundError();
    }

    return eventSpecificaton;
}

export {
    getEventSpecificationService
}