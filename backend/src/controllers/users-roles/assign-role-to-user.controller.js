import { assignRoleToUserService } from "../../services/users-roles/assign-role-to-user.service.js";

async function assignRoleToUserController(request, reply) {
    let userId = request.params.id;
    let { roleId } = request.body;

    let roleUser = await assignRoleToUserService({ userId, roleId });

    return reply.status(201).send(roleUser);
}

export {
    assignRoleToUserController
}