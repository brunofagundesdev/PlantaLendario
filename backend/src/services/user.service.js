import userRepository from "../repositories/user.repository.js";

class UserService {
    constructor({ repository }) {
        this.repository = repository;

    }

    async create({ data }) {

    }

    async get({ id }) {

    }

    async list({ filters = {} }) {

    }

    async update({ id, data }) {

    }

    async delete({ id }) {

    }
}

const userService = new UserService({ repository: userRepository });
export default userService; 