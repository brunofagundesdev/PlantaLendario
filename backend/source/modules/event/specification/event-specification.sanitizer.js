import BaseSanitizer from "../../../utils/base.sanitizer.js";

import EventTypeSanitizer from "../type/event-type.sanitizer.js";

import * as EventSpecificationErrors from "./event-specification.error.js";


export default class EventSpecificationSanitizer extends BaseSanitizer {

    static parseCreate({ typeId, data }) {
        const parsed = { data: {} };
        parsed.typeId = EventTypeSanitizer.parseId(typeId);
        parsed.data.name = this.parseName(data.name);

        return parsed;
    }

    static parseGet({ id }) {
        const parsed = {};
        parsed.id = this.parseId(id);

        return parsed;
    }

    static parseUpdate({ id, data }) {
        const parsed = { data: {} };
        parsed.id = this.parseId(id);

        if (data.name !== undefined) {
            parsed.data.name = this.parseName(data.name);
        }

        if (!Object.keys(parsed.data).length) {
            throw new EventSpecificationErrors.EventSpecificationUpdateInvalidError();
        }
        return parsed;
    }

    static parseList({ typeId }) {
        const parsed = {};

        parsed.typeId = EventTypeSanitizer.parseId(typeId);
        return parsed;
    }

    static parseDelete({ id }) {
        const parsed = {};
        parsed.id = this.parseId(id);

        return parsed;
    }

    // ===============================================================

    static parseId(id) {
        if (!["string", "number"].includes(typeof id)) {
            throw new EventSpecificationErrors.EventSpecificationIdInvalidError();
        }

        this.validateId(id);
        return id;
    }

    static parseName(name) {
        if (typeof name !== "string") {
            throw new EventSpecificationErrors.EventSpecificationNameInvalidError();
        }

        name = super.normalizeName(name, { accentuation: true });
        this.validateName(name);
        return name;
    }

    // ===============================================================

    static validateId(id) {
        if (!super.validateSerial(id)) {
            throw new EventSpecificationErrors.EventSpecificationIdInvalidError();
        }
        return;
    }

    // ===============================================================

}