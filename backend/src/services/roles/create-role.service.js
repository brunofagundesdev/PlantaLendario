// Repository
import { createRoleRepository } from "../../repository/roles/create-role.repository.js";
import { getRoleByNameRepository } from "../../repository/roles/get-role-by-name.repository.js";

// Utils
import { normalizeName } from "../../utils/normalize-name.js";

// Errors
import * as RoleErrors from "../../errors/role.errors.js";
import { getRoleByColorRepository } from "../../repository/roles/get-role-by-color.repository.js";

async function createRoleService({ name, color = "#000000" }) {

    // Name
    if (typeof name !== "string" || !name) {
        throw new RoleErrors.RoleNameInvalidError();
    }

    let normalizedName = normalizeName(name).toLowerCase();

    let existingRoleName = await getRoleByNameRepository({ name: normalizedName });
    if (existingRoleName) {
        throw new RoleErrors.RoleNameAlredyExistsError();
    }

    // Color
    const regex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
    if (!regex.test(color)) {
        throw new RoleErrors.RoleColorInvalidError();
    }

    let existingRoleColor = await getRoleByColorRepository({ color });
    if (existingRoleColor) {
        throw new RoleErrors.RoleColorAlredyUsedError();
    }

    let createdRole = await createRoleRepository({ name: normalizedName, color });
    return createdRole;
}

export { createRoleService }