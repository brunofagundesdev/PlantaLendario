import { getUserService } from "../../services/users/get-user.service.js";

export async function getUserController(request, reply) {
    const id  = request.params.id;
    const user = await getUserService({id});
    return reply.status(200).send(user);
}