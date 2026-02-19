import { createEventRepository } from "../../repository/events/create-event.repository.js";

import { normalizeName } from "../../utils/normalize-name.js";
import { validateName } from "../../utils/validate-name.js";

import * as EventErrors from "../../errors/events/event.errors.js";

async function createEventService({
    title,
    description = null,
    typeId,
    assessment = null,
    schedule = null,
    files = null
}) {
    let normalizedTitle = normalizeName(title, { accentuation: true });
    if (!validateName(normalizedTitle)) {
        throw new EventErrors.EventTitleInvalidError();
    }







}

export {
    createEventService
}