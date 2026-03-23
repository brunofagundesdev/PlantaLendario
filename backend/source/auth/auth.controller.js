import authService from "./auth.service.js";
import UserSanitizer from "../modules/user/user.sanitizer.js";

class AuthController {
    constructor({ service }) {
        this.service = service;
    }

    async register(request, reply) {
        let data = request.body;

        let sanitized = UserSanitizer.parseCreate({ data });
        let registeredUser = await this.service.register({ ...sanitized.data, password: data.password });
        // enviar jwt
        return reply.status(201).send(registeredUser);
    }

    login(request, reply) {

    }

    logout(request, reply) {

    }
}

const authController = new AuthController({ service: authService });
export default authController;