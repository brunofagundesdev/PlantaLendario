import { database } from "../../../infra/database.js";

class EventTypeRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        const { name } = data;
        const [result] = await this.database`
            insert into event_type(name)
            values (${name})
            returning id;
        `;
        return result;
    }

    async get({ criteria }) {
        const [result] = await this.database`
            select id, name
            from event_type
            where ${this.database.buildQuery(criteria)}
            limit 1;
        `;
        return result ?? null;
    }

    async list() {
        const result = await this.database`
            select id, name, email, created_at
            from event_type;
        `;
        return result;
    }

    async update({ id, data }) {
        const [result] = await this.database`
            update event_type
            set ${data}
            where id = ${id}
            returning id;
        `;
        return result;
    }

    async delete({ id }) {
        const [result] = await this.database`
            delete from event_type
            where id = ${id}
            returning id;
        `;
        return result;
    }
}

const eventTypeRepository = new EventTypeRepository({ database: database });
export default eventTypeRepository;