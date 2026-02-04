import { assignRoleRepository } from "../../repository/usersRoles/assign-role.repository.js";

import { getRoleRepository } from "../../repository/roles/get-role.repository.js";
import { getUserRepository } from "../../repository/users/get-user.repository.js";
import { getRolesByUserIdRepository } from "../../repository/usersRoles/get-roles-by-user-id.repository.js";

import { RoleIdInvalidError, RoleNotFoundError } from "../../errors/role.errors.js";
import { UserIdInvalidError, UserNotFoundError } from "../../errors/user.errors.js";

import { UserAlreadyHasRole } from "../../errors/userRoles.errors.js";

import { validate as uuidValidate } from "uuid";

async function assignRoleService({ userId, roleId }) {

    // User
    if (!uuidValidate(userId)) {
        throw new UserIdInvalidError();
    }

    let user = await getUserRepository({ id: userId });
    if (!user) {
        throw new UserNotFoundError();
    }

    // Role
    if (!uuidValidate(roleId)) {
        throw new RoleIdInvalidError();
    }

    let role = await getRoleRepository({ id: roleId });
    if (!role) {
        throw new RoleNotFoundError();
    }

    let userRoles = await getRolesByUserIdRepository({ id: userId })
    user = {
        ...user,
        roles: userRoles
    };

    console.log(user)
    let userHasRole = user.roles.some(role => role.id === roleId);

    if (userHasRole) {
        throw new UserAlreadyHasRole();
    }


    await assignRoleRepository({ userId, roleId })
    return;
}

export {
    assignRoleService
}