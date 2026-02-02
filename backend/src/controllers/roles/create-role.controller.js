import { createRoleService } from "../../services/roles/create-role.service.js";

async function createRoleController(request, reply) {
    let { name, color } = request.body;

    await createRoleService({ name, color })
    return reply.status(204).send();
}

export {
    createRoleController
}