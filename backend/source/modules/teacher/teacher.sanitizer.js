import BaseSanitizer from "../../utils/base.sanitizer.js";

import * as TeacherErrors from "./teacher.error.js";

export default class TeacherSanitizer extends BaseSanitizer {
    static parseCreate({ data }) {
        let parsed = { data: {} };
        parsed.data.name = this.parseName(data.name);
        if (data.email !== undefined) {
            parsed.data.email = this.parseEmail(data.email);
        }
        if (data.telephone !== undefined) {
            parsed.data.telephone = this.parseTelephone(data.telephone);
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
        let parsed = { data: {} };

        parsed.id = this.parseId(id);

        if (data.name !== undefined) {
            parsed.data.name = this.parseName(data.name);
        }

        if (data.email !== undefined) {
            parsed.data.email = this.parseEmail(data.email);
        }

        if (data.telephone !== undefined) {
            parsed.data.telephone = this.parseTelephone(data.telephone);
        }

        if (!Object.keys(parsed.data).length) {
            throw new TeacherErrors.TeacherUpdateInvalidError();
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
            throw new TeacherErrors.TeacherNameInvalidError();
        }
        name = this.normalizeName(name, { accentuation: true });
        this.validateName(name);
        return name;
    }

    static parseEmail(email) {
        if (typeof email !== "string") throw new TeacherErrors.TeacherEmailInvalidError();
        try {
            email = super.normalizeEmail(email);
        } catch (error) {
            throw new TeacherErrors.TeacherEmailInvalidError()
        }
        this.validateEmail(email);

        return email;
    }

    static parseTelephone(telephone) {
        if (typeof telephone !== "string") throw new TeacherErrors.TeacherTelephoneInvalidError();
        try {
            telephone = super.normalizeTelephone(telephone);
        } catch (error) {
            throw new TeacherErrors.TeacherTelephoneInvalidError();
        }
        this.validateTelephone(telephone);

        return telephone;
    }

    static parseId(id) {
        if (typeof id !== "string") throw new TeacherErrors.TeacherIdInvalidError();
        this.validateId(id);
        return id;
    }

    // =======================VALIDATORS ESTRUTURAIS===========================
    static validateId(id) {
        if (!this.validateUUID(id)) throw new TeacherErrors.TeacherIdInvalidError();
        return;
    };

    static validateName(name) {
        if (!super.validateName(name)) throw new TeacherErrors.TeacherNameInvalidError();
        return;
    }

    static validateEmail(email) {
        if (!super.validateEmail(email)) {
            throw new TeacherErrors.TeacherEmailInvalidError();
        }

        return;
    }

    static validateTelephone(telephone) {
        if (!super.validateTelephone(telephone)) {
            throw new TeacherErrors.TeacherTelephoneInvalidError();
        }
        return;
    }
}