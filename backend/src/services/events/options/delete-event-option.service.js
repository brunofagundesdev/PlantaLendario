import { deleteEventOptionRepository } from "../../../repository/events/options/delete-event-option.repository.js";
import { getEventOptionRepository } from "../../../repository/events/options/get-event-option.repository.js";

import { validateSerial } from "../../../utils/validate-serial.js";

import * as EventOptionErrors from "../../../errors/events/event-options.errors.js";

async function deleteEventOptionService({ id }) {
    if (!validateSerial(id)) {
        throw new EventOptionErrors.EventOptionIdInvalidError();
    }

    let eventOption = await getEventOptionRepository({ id });
    if (!eventOption) {
        throw new EventOptionErrors.EventOptionNotFoundError();
    }

    await deleteEventOptionRepository({ id });
    return;
}

export {
    deleteEventOptionService
}