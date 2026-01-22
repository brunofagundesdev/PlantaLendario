import { putUserService } from "../../services/users/put-user.service.js";

export async function putUserController(request, reply) {
    let id = request.params.id;
    let body = request.body;

    await putUserService({ id, body });

    return reply.status(204).send();
}