import { removeRoleFromUserRepository } from "../../repository/users-roles/remove-role-from-user.repository.js";

import { getUserRepository } from "../../repository/users/get-user.repository.js";
import { getRoleRepository } from "../../repository/roles/get-role.repository.js";

import * as UserErrors from "../../errors/user.errors.js";
import * as RoleErrors from "../../errors/role.errors.js";
import * as UserRoleErrors from "../../errors/user-role.errors.js";

import { validate as uuidValidate } from "uuid";
import { getRolesByUserIdRepository } from "../../repository/users-roles/get-roles-by-user-id.repository.js";

async function removeRoleFromUserService({ userId, roleId }) {

    // User
    if (!uuidValidate(userId)) {
        throw new UserErrors.UserIdInvalidError();
    }

    let user = await getUserRepository({ id: userId });
    if (!user) {
        throw new UserErrors.UserNotFoundError();
    }

    // Role
    if (!uuidValidate(roleId)) {
        throw new RoleErrors.RoleIdInvalidError();
    }

    let role = await getRoleRepository({ id: roleId });
    if (!role) {
        throw new RoleErrors.RoleNotFoundError();
    }

    let userRoles = await getRolesByUserIdRepository({ id: userId });
    let userHasRole = userRoles.some(role => role.id === roleId); 
    if (!userHasRole) {
        throw new UserRoleErrors.UserMissingRoleError()
    }

    let removedRole = await removeRoleFromUserRepository({ userId, roleId });
    return;

}

export {
    removeRoleFromUserService
}