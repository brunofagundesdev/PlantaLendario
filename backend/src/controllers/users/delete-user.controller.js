import { deleteUserService } from "../../services/users/delete-user.service.js";

export async function deleteUserController(request, reply) {
    const id = request.params.id;

    await deleteUserService({ id });
    return reply.status(204).send();
}