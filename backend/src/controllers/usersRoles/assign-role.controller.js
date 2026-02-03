import { assignRoleService } from "../../services/userRoles/assign-role.service.js";

async function assignRoleController(request, reply) {
    let userId = request.params.id;
    let roleId = request.body.roleId;

    await assignRoleService({ userId, roleId });

    return reply.status(201).send();
}

export {
    assignRoleController
}