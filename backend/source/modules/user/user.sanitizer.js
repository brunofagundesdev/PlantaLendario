import BaseSanitizer from "../../utils/base.sanitizer.js";

import * as UserErrors from "./user.error.js";

class UserSanitizer extends BaseSanitizer {
    // =======================PARSERS DO REQUEST===========================
    static parseCreate({ data }) {
        const parsed = { data: {} };
        parsed.data.name = this.parseName(data.name);
        parsed.data.email = this.parseEmail(data.email);

        return parsed;
    }
    static parseGet({ id }) {
        const parsed = {};
        parsed.id = this.parseId(id);

        return parsed;
    }
    // static parseListQuery({ query }) {
    // }
    static parseUpdate({ id, data }) {
        const parsed = { data: {} };

        parsed.id = this.parseId(id);

        if (data.name !== undefined) {
            parsed.data.name = this.parseName(data.name);
        }

        if (data.email !== undefined) {
            parsed.data.email = this.parseEmail(data.email);
        }

        if (!Object.keys(parsed.data).length) {
            throw new UserErrors.InvalidUserUpdateError();
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
        if (typeof name !== "string") throw new UserErrors.UserNameInvalidError();

        name = this.normalizeName(name, { accentuation: true });
        this.validateName(name);
        return name;
    }

    static parseEmail(email) {
        if (typeof email !== "string") throw new UserErrors.UserEmailInvalidError();

        email = this.normalizeEmail(email);
        this.validateEmail(email);

        return email;
    }

    static parseId(id) {
        if (typeof id !== "string") {
            throw new UserErrors.UserIdInvalidError();
        }
        this.validateId(id);
        return id;
    }

    // =======================VALIDATORS ESTRUTURAIS===========================
    static validateId(id) {
        if (!super.validateUUID(id)) {
            throw new UserErrors.UserIdInvalidError();
        }
        return;
    };

    static validateName(name) {
        if (!super.validateName(name)) {
            throw new UserErrors.UserNameInvalidError();
        }
        return;
    }

    static validateEmail(email) {
        if (!super.validateEmail(email)) {
            throw new UserErrors.UserEmailInvalidError();
        }

        return;
    }
}

export default UserSanitizer; 