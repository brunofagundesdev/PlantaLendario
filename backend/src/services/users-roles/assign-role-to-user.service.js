import { assignRoleRepository } from "../../repositories/users-roles/assign-role-to-user.repository.js";

import { getRoleRepository } from "../../repositories/roles/get-role.repository.js";
import { getUserRepository } from "../../repositories/users/get-user.repository.js";
import { getRolesByUserIdRepository } from "../../repositories/users-roles/get-roles-by-user-id.repository.js";

import { RoleIdInvalidError, RoleNotFoundError } from "../../errors/role.errors.js";
import { UserIdInvalidError, UserNotFoundError } from "../../errors/user.errors.js";

import { UserAlreadyHasRoleError } from "../../errors/user-role.errors.js";

import { validate as uuidValidate } from "uuid";

async function assignRoleToUserService({ userId, roleId }) {

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

    let userHasRole = user.roles.some(role => role.id === roleId);

    if (userHasRole) {
        throw new UserAlreadyHasRoleError();
    }


    await assignRoleRepository({ userId, roleId })
    return;
}

export {
    assignRoleToUserService
}