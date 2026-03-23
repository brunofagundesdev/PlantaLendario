import userRoleRepository from "./user-role.repository.js";
import userRepository from "../user/user.repository.js";
import roleRepository from "../role/role.repository.js";

import * as UserErrors from "../user/user.error.js";
import * as RoleErrors from "../role/role.error.js";
import * as UserRoleErrors from "./user-role.error.js";

class UserRoleService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async assign({ userId, roleId }) {
        let user = await userRepository.get({ id: userId });
        if (!user) throw new UserErrors.UserNotFoundError();

        let role = await roleRepository.get({ id: roleId });
        if (!role) throw new RoleErrors.RoleNotFoundError();

        let userRoles = await this.repository.getRolesByUser({ userId });

        let userHasRole = userRoles.some(role => role.id === roleId);
        if (userHasRole) throw new UserErrors.UserAlreadyHasRoleError();

        let assignment = await this.repository.assign({ userId, roleId });
        return assignment;
    }

    async deassign({ userId, roleId }) {
        let user = await userRepository.get({ id: userId });
        if (!user) throw new UserErrors.UserNotFoundError();

        let role = await roleRepository.get({ id: roleId });
        if (!role) throw new RoleNotFoundError();

        let userRoles = await this.repository.getRolesByUser({ userId });

        let userHasRole = userRoles.some(role => role.id === roleId);
        if (!userHasRole) throw new UserRoleErrors.UserMissingRoleError();

        let deassignment = await this.repository.deassign({ userId, roleId })
        return deassignment;
        
    }
}

const userRoleController = new UserRoleService({ repository: userRoleRepository });
export default userRoleController;