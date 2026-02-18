import { removeRoleFromUserService } from "../../services/users-roles/remove-role-from-user.service.js";

async function removeRoleFromUserController(request, reply) {
    let { userId = id, roleId } = request.params;

    let removedRole = await removeRoleFromUserService({ userId, roleId })

    return reply.status(200).send();
}

export {
    removeRoleFromUserController
}