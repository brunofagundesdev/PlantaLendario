import { getEventOptionsRepository } from "../../../repository/events/options/get-event-options.repository.js";

import * as EventSpecificationErrors from "../../../errors/events/event-specifications.errors.js";

import { validateSerial } from "../../../utils/validate-serial.js";
import { getEventSpecificationRepository } from "../../../repository/events/specifications/get-event-specification.repository.js";

async function getEventOptionsService({ specificationId }) {

    if (!validateSerial(specificationId)) {
        throw new EventSpecificationErrors.EventSpecificationIdInvalidError();
    }

    let eventSpecification = await getEventSpecificationRepository({ id: specificationId });
    if (!eventSpecification) {
        throw new EventSpecificationErrors.EventSpecificationNotFoundError();
    }

    let eventOptions = await getEventOptionsRepository({ specificationId });
    return eventOptions;
}

export {
    getEventOptionsService
}