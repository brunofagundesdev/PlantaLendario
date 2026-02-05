import { createEventTypeRepository } from "../../../repository/events/types/create-event-type.repository.js";

import { normalizeName } from "../../../utils/normalize-name.js";

import { EventTypeNameInvalidError } from "../../../errors/events/types/event-type.errors.js";

async function createEventTypeService({ name }) {

    if (typeof name !== "string") {
        throw new EventTypeNameInvalidError();
    }

    let normalizedName = normalizeName(name);

    if (!normalizedName) {
        throw new EventTypeNameInvalidError();
    }

    await createEventTypeRepository({ name: normalizedName });

    return;
}

export {
    createEventTypeService
}