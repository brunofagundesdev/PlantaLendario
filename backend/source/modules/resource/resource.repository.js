import { database } from "../../infra/database.js";

class ResourceRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        const result = await this.database`
            insert into resource ${this.database(data)}
            returning id;
        `;
        return result;
    }

    async get({ criteria }) {
        let [result] = await this.database`
            select id, title, description, created_at, created_by, updated_at, updated_by
            from resource
            where ${this.database.buildConditions(criteria)}
            limit 1;
        `;
        return result ?? null;
    }

    async list() {
        let [result] = await this.database`
            select id, title, description, created_at, created_by, updated_at, updated_by 
            from resource;
        `;
        return result;
    }

    async update({ id, data }) {
        let [result] = await this.database`
            update resource
            set ${this.database(data)}, updated_at = now()
            where id = ${id}
            returning id;
        `;
        return result;
    }

    async delete({ id }) {
        let [result] = await this.database`
            delete from resource
            where id = ${id}
            returning id;
        `;
        return result;
    }
}

const resourceRepository = new ResourceRepository({ database: database });
export default resourceRepository;