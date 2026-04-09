import BaseSanitizer from "../../../utils/base.sanitizer.js";

import * as LocationTypeErrors from "./location-type.error.js";

export default class LocationTypeSanitizer extends BaseSanitizer {

    static parseCreate({ data }) {
        const parsed = { data: {} };
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
            throw new LocationTypeErrors.LocationTypeUpdateInvalidError()
        }
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
            throw new LocationTypeErrors.LocationTypeIdInvalidError();
        }

        this.validateId(id);
        return id;
    }

    static parseName(name) {
        if (typeof name !== "string") {
            throw new LocationTypeErrors.LocationTypeNameInvalidError();
        }

        name = super.normalizeName(name, { accentuation: true });
        this.validateName(name);
        return name;
    }

    // ===============================================================

    static validateId(id) {
        if (!super.validateSerial(id)) {
            throw new LocationTypeErrors.LocationTypeIdInvalidError();
        }
        return;
    }

    // ===============================================================

}