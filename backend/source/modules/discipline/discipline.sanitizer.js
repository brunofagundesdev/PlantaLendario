import * as DisciplineErrors from "./discipline.error.js";


export default class DisciplineSanitizer {

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
            throw new DisciplineErrors.DisciplineUpdateInvalidError();
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
        if (typeof id !== "string") {
            throw new DisciplineErrors.DisciplineIdInvalidError();
        }
        this.validadeId(id);

        return id;
    }

    static parseName(name) {
        if (typeof name !== "string") {
            throw new DisciplineErrors.DisciplineNameInvalidError();
        }
        name = this.normalizeName(name, { accentuation: true });
        this.validateName();

        return name;
    }

    // ==================================================================

    static validateName(name) {
        if (!super.validateName(name)) {
            throw new DisciplineErrors.DisciplineNameInvalidError()
        }
        return;
    }

    static validadeId(id) {
        if (this.validateSerial(id)) {
            throw new DisciplineErrors.DisciplineIdInvalidError();
        }
        return;
    }
}