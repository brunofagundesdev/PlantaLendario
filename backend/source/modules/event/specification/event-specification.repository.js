import { database } from "../../../infra/database.js";

class EventSpecificationRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        const { typeId, name } = data;
        const [result] = await this.database`
            insert into event_specification(event_type, name)
            values (${typeId}, ${name})
            returning id, event_type, name;
        `;

        return result;
    }

    async get({ criteria }) {
        const [result] = await this.database`
            select id, event_type, name
            from event_specification
            where ${this.database.buildQuery(criteria)}
            limit 1;
        `;
        return result ?? null;
    }

    async list({ typeId }) {
        const result = await this.database`
            select id, event_type, name
            from event_specification
            where event_type = ${typeId};
        `;
        return result;
    }

    async update({ id, data }) {
        const [result] = await this.database`
            update event_specification
            set ${data}
            where id = ${id}
            returning id;
        `;
        return result;
    }

    async delete({ id }) {
        const [result] = await this.database`
            delete from event_specification
            where id = ${id}
            returning id;
        `;
        return result;
    }
}



const eventSpecificationRepository = new EventSpecificationRepository({ database: database });
export default eventSpecificationRepository;