// Repository
import { getRoleRepository } from "../../repository/roles/get-role.repository.js"

// Errors
import * as RoleErrors from "../../errors/role.errors.js"

// Validators
import { validate as uuidValidate} from "uuid";

async function getRoleService({ id }) {

    if (!uuidValidate(id)) {
        throw new RoleErrors.RoleIdInvalidError();
    }

    let role = await getRoleRepository();

    if (!role) {
        throw new RoleErrors.RoleNotFoundError();
    }

    return role;
}

export {
    getRoleService
}
