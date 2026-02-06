import { patchEventTypeRepository } from "../../../repository/events/types/patch-event-type.repository.js";
import { getEventTypeRepository } from "../../../repository/events/types/get-event-type.repository.js";
import { getEventTypeByNameRepository } from "../../../repository/events/types/get-event-type-by-name.repository.js";

import { normalizeName } from "../../../utils/normalize-name.js";


import { validateSerial } from "../../../utils/validate-serial.js";

import * as EventTypeErrors from "../../../errors/events/event-type.errors.js";
import { validateName } from "../../../utils/validate-name.js";

async function patchEventTypeService({ id, body = {} }) {

    if (!validateSerial(id)) {
        throw new EventTypeErrors.EventTypeIdInvalidError();
    }

    let eventType = await getEventTypeRepository({ id });
    if (!eventType) {
        throw new EventTypeErrors.EventTypeNotFoundError();
    }

    let { name } = body;

    let normalizedName = normalizeName(name).toLowerCase();

    if (!validateName(normalizedName)) {
        throw new EventTypeErrors.EventTypeNameInvalidError();
    }

    await patchEventTypeRepository({ id, body: { name: normalizedName } })
}

export {
    patchEventTypeService
}