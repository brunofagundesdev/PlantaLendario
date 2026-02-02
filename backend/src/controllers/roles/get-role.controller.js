import { getRoleService } from "../../services/roles/get-role.service.js"

async function getRoleController(request, reply) {
    let id = request.params.id;

    let role = await getRoleService({ id });

    return reply.status(200).send(role);

}

export { getRoleController }