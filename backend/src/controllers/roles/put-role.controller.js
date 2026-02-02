import { putRoleService } from "../../services/roles/put-role.service.js";

async function putRoleController(request, reply) {
    let { id } = request.params;
    let { name, color } = request.body;

    let role = await putRoleService({ id, name, color });
    return reply.status(200).send(role);
}

export { putRoleController }