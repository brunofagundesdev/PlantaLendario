import roleService from "./role.service.js";
import RoleSanitizer from "./role.sanitizer.js";

class RoleController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let data = request.body;

        let sanitized = RoleSanitizer.parseCreate({ data });

        let createdRole = await roleService.create(sanitized);
        return reply.status(201).send(createdRole);
    }

    async delete(request, reply) {
        let { id } = request.params;
        let sanitized = RoleSanitizer.parseDelete({ id });

        let deletedRole = await roleService.delete(sanitized);
        return reply.status(204).send();
    }

    async get(request, reply) {
        let { id } = request.params;
        let sanitized = RoleSanitizer.parseGet({ id });

        let caughtRole = await roleService.get(sanitized);
        return reply.status(204).send(caughtRole);
    }

    async list(request, reply) {
        let listedRoles = await roleService.list();
        return reply.status(200).send(listedRoles);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = RoleSanitizer.parseUpdate({ id, data });
        let updatedRole = await roleService.update(sanitized);
        return reply.status(200).send(updatedRole);

    }
}

const roleController = new RoleController({ service: roleService });
export default roleController;