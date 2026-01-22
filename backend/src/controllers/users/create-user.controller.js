import { createUserService } from "../../services/users/create-user.service.js";

export async function createUserController(request, reply) {
    let { name, email, password } = request.body;

    await createUserService({ name, email, password });
    return reply.status(201).send()
}