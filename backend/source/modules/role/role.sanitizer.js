import BaseSanitizer from "../../utils/base.sanitizer.js";

import chroma from 'chroma-js'

import * as RoleErrors from "./role.error.js";

class RoleSanitizer extends BaseSanitizer {
    // =======================PARSERS DO REQUEST===========================
    static parseCreate({ data }) {
        let parsed = { data: {} }
        parsed.data.name = this.parseName(data.name);
        if (data.color !== undefined) {
            parsed.data.color = this.parseColor(data.color);
        }

        return parsed;
    }
    static parseGet({ id }) {
        let parsed = {};
        parsed.id = this.parseId(id);
        return parsed;
    }
    // static parseListQuery({ query }) {
    // }
    static parseUpdate({ id, data }) {
        let parsed = {};

        parsed.id = this.parseId(id);

        if (data.name !== undefined) {
            parsed.data.name = this.parseName(data.name);
        }

        if (data.color !== undefined) {
            parsed.data.color = this.parseColor(data.color);
        }

        if (!Object.keys(parsed.data).length) {
            throw new RoleErrors.InvalidRoleUpdateError();
        }

        return parsed;

    }
    static parseDelete({ id }) {
        let parsed = {}
        parsed.id = this.parseId(id);

        return parsed;
    }

    // =======================PARSERS DOS CAMPOS===========================
    static parseName(name) {
        if (typeof name !== "string") {
            throw new RoleErrors.RoleNameInvalidError();
        }

        name = this.normalizeName(name, { accentuation: true });
        return name;
    }

    static parseColor(color) {
        if (typeof color !== "string") {
            throw new RoleErrors.RoleColorInvalidError();
        }
        color = this.normalizeColor(color);

        return color;
    }

    static parseId(id) {
        if (!this.validateId(id)) {
            throw new RoleErrors.RoleIdInvalidError();
        }

        return id;
    }

    // =======================VALIDATORS ESTRUTURAIS===========================
    static validateId = this.validateUUID;

    static validateName(name) {
        if (typeof name !== "string" || !name) {
            throw new RoleErrors.RoleNameInvalidError();
        }

        return name;
    }

    // =======================NORMALIZERS===========================

    static normalizeColor(color) {
        try {
            chroma(color).hex().toUpperCase();
        } catch (error) {
            throw new RoleErrors.RoleColorInvalidError();
        }
    }
}

export default RoleSanitizer; 