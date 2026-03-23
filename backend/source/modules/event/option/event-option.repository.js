import { database } from "../../../infra/database.js";

class EventOptionRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        const { specificationId, name } = data;
        const [result] = await this.database`
            insert into event_option(event_specification, name)
            values (${specificationId}, ${name})
            returning id, event_specification, name;
        `;

        return result;
    }

    async get({ criteria }) {
        const [result] = await this.database`
            select id, event_specification, name
            from event_option
            where ${this.database.buildQuery(criteria)}
            limit 1;
        `;
        return result ?? null;
    }

    async list({ specificationId }) {
        const result = await this.database`
            select id, event_specification, name
            from event_option
            where event_specification = ${specificationId};
        `;
        return result;
    }

    async update({ id, data }) {
        const [result] = await this.database`
            update event_option
            set ${data}
            where id = ${id}
            returning id;
        `;
        return result;
    }

    async delete({ id }) {
        const [result] = await this.database`
            delete from event_option
            where id = ${id}
            returning id;
        `;
        return result;
    }
}



const eventOptionRepository = new EventOptionRepository({ database: database });
export default eventOptionRepository;