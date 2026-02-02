import { patchRoleService } from "../../services/roles/patch-role.service.js";

async function patchRoleController(request, reply) {
    const id = request.params.id;
    let body = request.body;

    let role = await patchRoleService({ id, body });

    return reply.status(200).send(role);
}

export {
    patchRoleController
}