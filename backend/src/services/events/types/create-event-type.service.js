import { createEventTypeRepository } from "../../../repository/events/types/create-event-type.repository.js";
import { getEventTypeByNameRepository } from "../../../repository/events/types/get-event-type-by-name.repository.js";

import { normalizeName } from "../../../utils/normalize-name.js";

import * as EventTypeErrors from "../../../errors/events/event-type.errors.js";

async function createEventTypeService({ name }) {

    if (typeof name !== "string") {
        throw new EventTypeErrors.EventTypeNameInvalidError();
    }

    let normalizedName = normalizeName(name).toLowerCase();

    if (!normalizedName) {
        throw new EventTypeErrors.EventTypeNameInvalidError();
    }

    let existingEventType = await getEventTypeByNameRepository({ name: normalizedName });
    if (existingEventType) {
        throw new EventTypeErrors.EventTypeAlredyExistsError();
    }

    await createEventTypeRepository({ name: normalizedName });

    return;
}

export {
    createEventTypeService
}