import { putRoleRepository } from "../../repository/roles/put-role.repository.js";
import { getRoleRepository } from "../../repository/roles/get-role.repository.js";

// Errors
import * as RoleErrors from "../../errors/role.errors.js"

// Validators
import { validate as uuidValidate } from "uuid";


async function putRoleService({ id, name, color }) {

    if (!uuidValidate(id)) {
        throw new RoleErrors.RoleIdInvalidError();
    }

    if (!name || !color) {
        throw new RoleErrors.RolePutInvalidError();
    }

    let role = await getRoleRepository({ id });

    if (!role) {
        throw new RoleErrors.RoleNotFoundError();
    }

    return await putRoleRepository({ id, name, color });
}

export {
    putRoleService
}