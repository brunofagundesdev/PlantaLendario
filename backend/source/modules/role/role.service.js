import roleRepository from "./role.repository.js";
import * as RoleErrors from "./role.error.js";

class RoleService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async create({ data }) {
        const caughtRoleByName = await this.repository.get({ criteria: { name: data.name } });
        if (caughtRoleByName) {
            throw new RoleErrors.RoleNameAlredyRegisteredError();
        }

        let createdRole = await this.repository.create({ data });
        return createdRole;
    }

    async get({ id }) {
        let caughtRole = await this.repository.get({ criteria: { id } });
        if (!caughtRole) {
            throw new RoleErrors.RoleNotFoundError();
        }
        return caughtRole;
    }

    async list() {
        let listedRoles = await roleRepository.list();
        return listedRoles;
    }

    async update({ id, data }) {
        let caughtRole = await this.repository.get({ criteria: { id } });
        if (!caughtRole) {
            throw new RoleErrors.RoleNotFoundError();
        }

        if (data.name !== undefined) {
            let caughtRoleByName = await this.repository.get({ criteria: { name: data.name } });
            if (caughtRoleByName) {
                throw new RoleErrors.RoleNameAlredyRegisteredError();
            }
        }

        if (data.color !== undefined) {
            let caughtRoleByColor = await this.repository.get({ criteria: { color: data.color } });
            if (caughtRoleByColor) {
                throw new RoleErrors.RoleColorAlredyRegisteredError();
            }
        }

        const roleUpdated = await this.repository.update({ id, data });
        return roleUpdated;

    }

    async delete({ id }) {

        let caughtRole = await this.repository.get({ criteria: { id } });
        if (!caughtRole) {
            throw new RoleErrors.RoleNotFoundError();
        }

        const roleDelete = await tihs.repository.delete({id})
        return roleDelete;
    }


}

const roleService = new RoleService({ repository: roleRepository });
export default roleService; 