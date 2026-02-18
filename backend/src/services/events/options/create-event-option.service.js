import { createEventSpecificationRepository } from "../../../repository/events/options/create-event-options.repository.js";

import { getEventSpecificationByNameRepository } from "../../../repository/events/options/get-event-option-by-name.repository.js";
import { getEventTypeRepository } from "../../../repository/events/types/get-event-type.repository.js";

import { validateSerial } from "../../../utils/validate-serial.js";
import { normalizeName } from "../../../utils/normalize-name.js";
import { validateName } from "../../../utils/validate-name.js";

import * as EventSpecificationErrors from "../../../errors/events/event-options.errors.js";
import { EventTypeIdInvalidError, EventTypeNotFoundError } from "../../../errors/events/event-type.errors.js";

async function createEventSpecificationService({ typeId, name }) {

    if (!validateSerial(typeId)) {
        throw new EventTypeIdInvalidError();
    }

    let eventType = await getEventTypeRepository({ id: typeId });
    if (!eventType) {
        throw new EventTypeNotFoundError();
    }

    let normalizedName = normalizeName(name).toLowerCase();
    if (!validateName(normalizedName)) {
        throw new EventSpecificationErrors.EventSpecificationNameInvalidError();
    }

    let existingEventSpecification = await getEventSpecificationByNameRepository({ name: normalizedName });
    if (existingEventSpecification) {
        throw new EventSpecificationErrors.EventSpecificationNameAlredyExistsError();
    }

    let eventSpecification = await createEventSpecificationRepository({ typeId, name: normalizedName });
    return eventSpecification;
}


export {
    createEventSpecificationService
}