import userRepository from "./user.repository.js";
import * as UserErrors from "./user.error.js";

class UserService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async create({ data }) {
        const caughtUserByName = await this.repository.get({ criteria: { name: data.name } });
        if (caughtUserByName) {
            throw new UserErrors.UserNameAlredyRegisteredError();
        }

        const caughtUserByEmail = await this.repository.get({ criteria: { email: data.email } });
        if (caughtUserByEmail) {
            throw new UserErrors.UserEmailAlredyRegisteredError();
        }

        let createdUser = await this.repository.create({ data });
        return createdUser;

    }

    async get({ id }) {
        let caughtUser = await this.repository.get({ criteria: { id } });
        if (!caughtUser) {
            throw new UserErrors.UserNotFoundError();
        }
        return caughtUser;
    }

    async list() {
        let listedUsers = await userRepository.list();
        return listedUsers;
    }

    async update({ id, data }) {

    }

    async delete({ id }) {
        let caughtUser = await this.repository.get({ criteria: { id } });
        if (!caughtUser) {
            throw new UserErrors.UserNotFoundError();
        }

        let deletedUser = await this.repository.delete({ criteria: { id } });
        return deletedUser;
    }
}

const userService = new UserService({ repository: userRepository });
export default userService; 