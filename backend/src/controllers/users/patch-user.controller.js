import { patchUserService } from "../../services/users/patch-user.service.js";

export async function patchUserController(request, reply) {
    let id = request.params.id;
    let body = request.body;

    await patchUserService({ id, body });

    return reply.status(204).send();
}