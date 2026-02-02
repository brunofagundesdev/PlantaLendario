import { patchRoleRepository } from "../../repository/roles/patch-role.repository.js";
import { getRoleRepository } from "../../repository/roles/get-role.repository.js";
// Helpers
import { getRoleByNameRepository } from "../../repository/roles/get-role-by-name.repository.js";
import { getRoleByColorRepository } from "../../repository/roles/get-role-by-color.repository.js";
import { normalizeName } from "../../utils/normalize-name.js";
// Errors
import * as RoleErrors from "../../errors/role.errors.js";

import { validate as uuidValidate } from "uuid";

async function patchRoleService({ id, body = {} }) {

    // Id
    if (!uuidValidate(id)) {
        throw new RoleErrors.RoleIdInvalidError();
    }
    let roleToUpdate = await getRoleRepository({ id });

    if (!roleToUpdate) {
        throw new RoleErrors.RoleNotFoundError();
    }

    // Desestruturação e Validação Patch
    let { name, color } = body;

    if (!name && !color) {
        throw new RoleErrors.RolePatchInvalidError();
    }

    // Name
    let normalizedName;
    if (name != null) {
        if (typeof name !== "string") {
            throw new RoleErrors.RoleNameInvalidError();
        }

        normalizedName = normalizeName(name);

        let existingRoleByName = await getRoleByNameRepository({ name: normalizedName });
        if (existingRoleByName && existingRoleByName.id !== id) {
            throw new RoleErrors.RoleNameAlredyExistsError();
        }
    }

    // Color
    if (color != null) {
        const regex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
        if (!regex.test(color)) {
            throw new RoleErrors.RoleColorInvalidError();
        }

        let existingRoleByColor = await getRoleByColorRepository({ color });
        if (existingRoleByColor && existingRoleByColor.id !== id) {
            throw new RoleErrors.RoleColorAlredyUsedError();
        }
    }

    return await patchRoleRepository({ id, body: { name: normalizedName, color } })

}

export {
    patchRoleService
}
