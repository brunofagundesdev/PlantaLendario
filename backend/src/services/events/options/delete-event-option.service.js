import { deleteEventSpecificationRepository } from "../../../repository/events/options/delete-event-options.repository.js";
import { getEventSpecificationRepository } from "../../../repository/events/options/get-event-option.repository.js";

import { validateSerial } from "../../../utils/validate-serial.js";

import * as EventSpecificationErrors from "../../../errors/events/event-specifications.errors.js";

async function deleteEventSpecificationService({ id }) {
    if (!validateSerial(id)) {
        throw new EventSpecificationErrors.EventSpecificationIdInvalidError();
    }

    let eventSpecification = await getEventSpecificationRepository({ id });
    if (!eventSpecification) {
        throw new EventSpecificationErrors.EventSpecificationNotFoundError();
    }

    await deleteEventSpecificationRepository({ id });
    return;
}

export {
    deleteEventSpecificationService
}