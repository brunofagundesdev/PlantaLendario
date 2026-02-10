import { patchEventSpecificationRepository } from "../../../repository/events/specifications/patch-event-specification.repository.js";
import { validateSerial } from "../../../utils/validate-serial.js";
import { getEventSpecificationRepository } from "../../../repository/events/specifications/get-event-specification.repository.js";

import { normalizeName } from "../../../utils/normalize-name.js"
import { validateName } from "../../../utils/validate-name.js"

import * as EventSpecificationErrors from "../../../errors/events/event-specifications.errors.js";

async function patchEventSpecificationService({ id, name }) {

    if (!validateSerial(id)) {
        throw new EventSpecificationErrors.EventSpecificationIdInvalidError();
    }

    let eventSpecification = await getEventSpecificationRepository({ id });

    if (!eventSpecification) {
        throw new EventSpecificationErrors.EventSpecificationNotFoundError();
    }

    let normalizedName = normalizeName(name).toLowerCase();

    if (!validateName(normalizedName)) {
        throw new EventSpecificationErrors.EventSpecificationNameInvalidError();
    }

    let existingEventSpecificationName = await getEventSpecificationByNameRepository({ name: normalizedName });

    if (existingEventSpecificationName) {
        throw new EventSpecificationErrors.EventSpecificationNameAlredyExistsError()
    }

    let patchEventSpecification = await patchEventSpecificationRepository({ id, name: normalizedName })
    return patchEventSpecification;

}

export {
    patchEventSpecificationService
}