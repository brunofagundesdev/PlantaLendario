import { patchEventOptionRepository } from "../../../repository/events/options/patch-event-option.repository.js";
import { validateSerial } from "../../../utils/validate-serial.js";
import { getEventOptionRepository } from "../../../repository/events/options/get-event-option.repository.js";
import { getEventOptionByNameRepository } from "../../../repository/events/options/get-event-option-by-name.repository.js";

import { normalizeName } from "../../../utils/normalize-name.js"
import { validateName } from "../../../utils/validate-name.js"

import * as EventOptionErrors from "../../../errors/events/event-options.errors.js";

async function patchEventOptionService({ id, name }) {

    if (!validateSerial(id)) {
        throw new EventOptionErrors.EventOptionIdInvalidError();
    }

    let eventOption = await getEventOptionRepository({ id });

    if (!eventOption) {
        throw new EventOptionErrors.EventOptionNotFoundError();
    }

    let normalizedName = normalizeName(name).toLowerCase();

    if (!validateName(normalizedName)) {
        throw new EventOptionErrors.EventOptionNameInvalidError();
    }

    let existingEventOptionName = await getEventOptionByNameRepository({ name: normalizedName });

    if (existingEventOptionName) {
        throw new EventOptionErrors.EventOptionNameAlredyExistsError()
    }

    let patchEventOption = await patchEventOptionRepository({ id, name: normalizedName })
    return patchEventOption;

}

export {
    patchEventOptionService
}