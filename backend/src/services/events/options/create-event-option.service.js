import { createEventOptionRepository } from "../../../repository/events/options/create-event-option.repository.js";

import { getEventOptionByNameRepository } from "../../../repository/events/options/get-event-option-by-name.repository.js";
import { getEventSpecificationRepository } from "../../../repository/events/specifications/get-event-specification.repository.js";

import { validateSerial } from "../../../utils/validate-serial.js";
import { normalizeName } from "../../../utils/normalize-name.js";
import { validateName } from "../../../utils/validate-name.js";

import * as EventOptionErrors from "../../../errors/events/event-options.errors.js";
import { EventSpecificationIdInvalidError, EventSpecificationNotFoundError } from "../../../errors/events/event-specifications.errors.js";

async function createEventOptionService({ specificationId, name }) {
    if (!validateSerial(specificationId)) {
        throw new EventSpecificationIdInvalidError();
    }

    let eventSpecification = await getEventSpecificationRepository({ id: specificationId });
    if (!eventSpecification) {
        throw new EventSpecificationNotFoundError();
    }

    let normalizedName = normalizeName(name).toLowerCase();
    if (!validateName(normalizedName)) {
        throw new EventOptionErrors.EventOptionNameInvalidError();
    }

    let existingEventOption = await getEventOptionByNameRepository({ name: normalizedName });
    if (existingEventOption) {
        throw new EventOptionErrors.EventOptionNameAlredyExistsError();
    }

    let eventOption = await createEventOptionRepository({ specificationId, name: normalizedName });
    return eventOption;
}


export {
    createEventOptionService
}