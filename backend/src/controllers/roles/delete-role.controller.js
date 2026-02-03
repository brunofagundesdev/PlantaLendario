import { deleteRoleService } from "../../services/roles/delete-role.service.js";

async function deleteRoleController(request, reply) {
    let id = request.params.id;

    await deleteRoleService({ id })
    return reply.status(204).send();
}

export {
    deleteRoleController
}