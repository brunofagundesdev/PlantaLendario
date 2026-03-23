import BaseSanitizer from "../../../utils/base.sanitizer.js";

import EventSpecificationSanitizer from "../specification/event-specification.sanitizer.js";

import * as EventOptionErrors from "./event-option.error.js";


export default class EventOptionSanitizer extends BaseSanitizer {

    static parseCreate({ specificationId, data }) {
        const parsed = { data: {} };
        parsed.specificationId = EventSpecificationSanitizer.parseId(specificationId);
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
            throw new EventOptionErrors.EventOptionUpdateInvalidError();
        }
        return parsed;
    }

    static parseList({ specificationId }) {
        const parsed = {};

        parsed.specificationId = EventSpecificationSanitizer.parseId(specificationId);
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
            throw new EventOptionErrors.EventOptionIdInvalidError();
        }

        this.validateId(id);
        return id;
    }

    static parseName(name) {
        if (typeof name !== "string") {
            throw new EventOptionErrors.EventOptionNameInvalidError();
        }

        name = super.normalizeName(name, { accentuation: true });
        this.validateName(name);
        return name;
    }

    // ===============================================================

    static validateId(id) {
        if (!super.validateSerial(id)) {
            throw new EventOptionErrors.EventOptionIdInvalidError();
        }
        return;
    }

    // ===============================================================

}