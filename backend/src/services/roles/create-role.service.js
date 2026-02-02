// Repository
import { createRoleRepository } from "../../repository/roles/create-role.repository.js";

// Errors
import { RoleNameInvalidError, RoleColorInvalidError } from "../../errors/role.errors.js";

async function createRoleService({ name, color = "#000000" }) {

    if (typeof name !== "string" || !name) {
        throw new RoleNameInvalidError();
    }

    const regex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
    if (!regex.test(color)) {
        throw new RoleColorInvalidError();
    }

    await createRoleRepository({ name, color });
}

export { createRoleService }