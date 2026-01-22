import { getUsersService } from "../../services/users/get-users.service.js";

export async function getUsersController(request, reply) {
    let options = request.query;

    const users = await getUsersService(options)

    return reply.status(200).send(users);
}