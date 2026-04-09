import * as LocationErrors from "./location.error.js";

import BaseSanitizer from "../../utils/base.sanitizer.js";

export default class LocationSanitizer extends BaseSanitizer {

    static parseCreate({ data }) {
        const parsed = { data: {} };
        parsed.data.name = this.parseName(data.name);
        parsed.data.type = this.parseType(data.type);
        if (data.parentId !== undefined) {
            parsed.data.parentId = this.parseId(data.parentId);
        }
        parsed.data.normalizedName = this.parseNormalizeName(data.name);

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
            parsed.data.normalizedName = this.parseNormalizeName(data.name);
        }

        if (data.parentId !== undefined) {
            parsed.data.parentId = this.parseId(data.parentId);
        }

        if (data.type !== undefined) {
            parsed.data.type = this.parseName(data.type);
        }

        if (!Object.keys(parsed.data).length) {
            throw new LocationErrors.LocationUpdateInvalidError();
        }

        return parsed;
    }

    static parseDelete({ id }) {
        const parsed = {};
        parsed.id = this.parseId(id);

        return parsed;
    }

    // ==================================================================

    static parseId(id) {
        if (!["string", "number"].includes(typeof id)) {
            throw new LocationErrors.LocationIdInvalidError();
        }
        id = this.normalizeId(id);
        this.validadeId(id);
        return id;
    }

    static parseName(name) {
        if (typeof name !== "string") {
            throw new LocationErrors.LocationNameInvalidError();
        }
        name = this.normalizeName(name, { accentuation: true });
        name = this.capitalizeName(name);
        this.validateName(name);
        return name;
    }

    static parseType(type) {
        if (typeof type !== "string") {
            throw new LocationErrors.LocationTypeInvalidError();
        }
        type = this.normalizeName(type, { lowerCase: true });
        return type;
    }

    static parseNormalizeName(name) {
        if (typeof name !== "string") {
            throw new LocationErrors.LocationNameInvalidError();
        }
        let normalizedName = this.normalizeName(name, { lowerCase: true }).replaceAll(" ", "_");
        return normalizedName;
    }

    // ==================================================================

    static validateName(name) {
        if (!super.validateName(name, { testNumber: true })) {
            throw new LocationErrors.LocationNameInvalidError();
        }
        return;
    }

    static validadeId(id) {
        if (!this.validateSerial(id)) {
            throw new LocationErrors.LocationIdInvalidError();
        }
        return;
    }

    // =============================================================

    static normalizeId(id) {
        id = Number(id);
        return id;
    }
}