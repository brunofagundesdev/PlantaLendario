import { deleteRoleRepository } from "../../repository/roles/delete-role.repository.js";
import { getRoleRepository } from "../../repository/roles/get-role.repository.js";

import { RoleIdInvalidError, RoleNotFoundError } from "../../errors/role.errors.js";
import { validate as uuidvalidate } from "uuid";

async function deleteRoleService({ id }) {

    if (!uuidvalidate(id)) {
        throw new RoleIdInvalidError();
    }

    let role = await getRoleRepository({ id });

    if (!role) {
        throw new RoleNotFoundError();
    }

    let roleDeleted = await deleteRoleRepository({ id });

}

export {
    deleteRoleService
}