import userService from "./user.service.js";
import UserSanitizer from "./user.sanitizer.js";

class UserController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let data = request.body;

        let sanitized = UserSanitizer.parseCreate({ data });

        let createdUser = await userService.create(sanitized);
        return reply.status(201).send(createdUser);
    }

    async get(request, reply) {
        let { id } = request.params;
        let sanitized = UserSanitizer.parseGet({ id });

        let caughtUser = await userService.get(sanitized);
        return reply.status(200).send(caughtUser);
    }

    async list(request, reply) {
        let listedUsers = await userService.list();
        return reply.status(200).send(listedUsers);
    }  

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = UserSanitizer.parseUpdate({ id, data });
        let updatedUser = await userService.update(sanitized);
        return reply.status(200).send(updatedUser);

    }

    async delete(request, reply) {
        let { id } = request.params;
        let sanitized = UserSanitizer.parseDelete({ id });

        let deletedUser = await userService.delete(sanitized);
        return reply.status(204).send();
    }
}

const userController = new UserController({ service: userService });
export default userController;