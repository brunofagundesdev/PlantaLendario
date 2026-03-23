import { database } from "../../infra/database.js";

class UserRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        const { name, email, password } = data;
        const [result] = await this.database`
            insert into account (name, email, password)
            values (${name}, ${email}, ${password})
            returning id;
        `;
        return result;
    }

    async get({ criteria }) {
        const [result] = await this.database`
            select id, name, email, created_at
            from account
            where ${this.database.buildQuery(criteria)}
            limit 1;
        `;
        return result ?? null;
    }

    async list() {
        const result = await this.database`
            select id, name, email
            from account;
        `;
        return result;
    }

    async update({ id, data }) {
        const [result] = await this.database`
            update account
            set ${data}
            where id = ${id}
            returning id;
        `;
        return result;
    }

    async delete({ id }) {
        const [result] = await this.database`
            delete from account
            where id = ${id}
            returning id;
        `;
        return result;
    }
}

const userRepository = new UserRepository({ database: database });
export default userRepository;