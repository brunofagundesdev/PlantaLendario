import userRepository from "../modules/user/user.repository.js";

class AuthService {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    static register({ data }) {

    }

    static login() {

    }

    static logout() {

    }
}

const authService = new AuthService({ userRepository });
export default authService;