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

    }

    async delete({ id }) {

    }
}

const roleService = new RoleService({ repository: roleRepository });
export default roleService; 