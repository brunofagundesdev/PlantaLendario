import { database } from "../../infra/database.js";

class RoleRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        const [result] = await this.database`
            insert into role ${this.database`${data}`}
            returning id;
        `;
        return result;
    }


    async get({ criteria }) {
        const [result] = await this.database`
            select id, name, color
            from role
            where ${this.database`${criteria}`}
            limit 1;
        `;
        return result ?? null;
    }

    async list() {
        const result = await this.database`
            select id, name, color
            from role;
        `;
        return result;
    }

    async update({ id, data }) {
        const [result] = await this.database`
            update role
            set ${this.database(data)}
            where id = ${id}
            returning id;
        `;
        return result;
    }
    
    async delete({ id }) {
        const [result] = await this.database`
            delete from role
            where id = ${id}
            returning id;
        `;
        return result;
    }
}

const userRepository = new RoleRepository({ database: database });
export default userRepository;