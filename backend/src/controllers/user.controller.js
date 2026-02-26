import userService from "../services/user.service.js";
import UserSanitizer from "../sanitizers/user.sanitizer.js";

class UserController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let data = request.body;

        let sanitizedData = UserSanitizer.parseCreate({ data });

        let createdUser = await userService.create({ data: sanitizedData });
        return reply.status(201).send(createdUser);
    }

    async delete(request, reply) {

    }

    async get(request, reply) {

    }

    async list(request, reply) {

    }

    async update(request, reply) {

    }
}

const userController = new UserController({ service: userService });
export default userController;