import BaseSanitizer from "../../utils/base.sanitizer.js";

import * as DisciplineErrors from "../user/user.error.js"
import * as TeacherErrors from "../role/role.error.js"

export default class DisciplineTeacherSanitizer extends BaseSanitizer {
    static parseAssign({ userId, roleId }) {
        let parsed = {};
        parsed.userId = this.parseDisciplineId(userId);
        parsed.roleId = this.parseTeacherId(roleId);

        return parsed;
    }

    static parseDeassign({ userId, roleId }) {
        let parsed = {};
        parsed.userId = this.parseDisciplineId(userId);
        parsed.roleId = this.parseTeacherId(roleId);

        return parsed;
    }

    // Parsers dos Campos
    static parseDisciplineId(id) {
        if (typeof id !== "string") {
            throw new DisciplineErrors.DisciplineIdInvalidError();
        }
        this.validateDisciplineId(id);
        return id;
    }

    static parseTeacherId(id) {
        if (typeof id !== "string") {
            throw new TeacherErrors.TeacherIdInvalidError();
        }
        this.validateTeacherId(id);
        return id;
    }

    // Validators
    static validateDisciplineId(id) {
        if (!this.validadeSerial(id)) {
            throw new DisciplineErrors.DisciplineIdInvalidError();
        }
        return;
    }
    static validateTeacherId(id) {
        if (!this.validateUUID(id)) {
            throw new TeacherErrors.TeacherIdInvalidError();
        }
        return;
    }
}