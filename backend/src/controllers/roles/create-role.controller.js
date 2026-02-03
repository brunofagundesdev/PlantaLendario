import { createRoleService } from "../../services/roles/create-role.service.js";

async function createRoleController(request, reply) {
    let { name, color } = request.body;

    let role = await createRoleService({ name, color })
    return reply.status(201).send(role);
}

export {
    createRoleController
}