import { createEventSpecificationRepository } from "../../../repository/events/specifications/create-event-specification.repository.js";
import { validateSerial } from "../../../utils/validate-serial.js";

import * as EventSpecificationErrors from "../../../errors/events/event-specifications.errors.js";



async function createEventSpecificationService({ typeId, body = {} }) {
    let { name } = body;

    if (!validateSerial(typeId)) {
        throw new EventSpecificationErrors.EventSpecificationIdInvalidError();
    }


    return;
}


export {
    createEventSpecificationService
}