import BaseSanitizer from "../../utils/base.sanitizer.js";

import * as UserErrors from "../user/user.error.js"
import * as RoleErrors from "../role/role.error.js"

export default class UserRoleSanitizer extends BaseSanitizer {
    static parseAssign({ userId, roleId }) {
        let parsed = {};
        parsed.userId = this.parseUserId(userId);
        parsed.roleId = this.parseRoleId(roleId);

        return parsed;
    }

    static parseDeassign({ userId, roleId }) {
        let parsed = {};
        parsed.userId = this.parseUserId(userId);
        parsed.roleId = this.parseRoleId(roleId);

        return parsed;
    }

    // Parsers dos Campos
    static parseUserId(id) {
        if (typeof id !== "string") {
            throw new UserErrors.UserIdInvalidError();
        }
        this.validateUserId(id);
        return id;
    }

    static parseRoleId(id) {
        if (typeof id !== "string") {
            throw new RoleErrors.RoleIdInvalidError();
        }
        this.validateRoleId(id);
        return id;
    }

    // Validators
    static validateUserId(id) {
        if (!this.validateUUID(id)) {
            throw new UserErrors.UserIdInvalidError();
        }
        return;
    }
    static validateRoleId(id) {
        if (!this.validateUUID(id)) {
            throw new RoleErrors.RoleIdInvalidError();
        }
        return;
    }
}