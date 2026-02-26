import { database } from "../infra/database.js";

class UserRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        let [result] = await this.database`
            insert into account ${this.database(data)}
            returning id;
        `;
        return result;
    }


    async get({ criteria }) {
        let [result] = await this.database`
            select id, name, email, created_at
            from account
            where ${this.database(criteria)}
            limit 1;
        `;
        return result ?? null;
    }

    async list({ filters = {} }) {
        const clauses = Object.keys(filters).length ? this.database`where ${this.database(filters)}` : this.database``;

        let result = await this.database`
            select id, name, email
            from account
            ${clauses};
        `;
        return result;
    }

    async update({ id, data }) {
        let [result] = await this.database`
            update account
            set ${this.database(data)}
            where id = ${id}
            returning id;
        `;
        return result;
    }
    
    async delete({ id }) {
        let [result] = await this.database`
            delete from account
            where id = ${id}
            returning id;
        `;
        return result;
    }
}

const userRepository = new UserRepository({ database: database });
export default userRepository; 