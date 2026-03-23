import database from "../../infra/database.js";

class DisciplineRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        const result = await this.database`
            insert into discipline ${this.database(data)}
            returning id;
        `;
        return result;
    }

    async get({ criteria }) {
        let [result] = await this.database`
            select id, name
            from discipline
            where ${this.database.buildConditions(criteria)}
            limit 1;
        `;
        return result ?? null;
    }

    async list() {
        let [result] = await this.database`
            select id, name
            from discipline;
        `;
        return result;
    }

    async update({ id, data }) {
        let [result] = await this.database`
            update discipline
            set ${this.database(data)}
            where id = ${id}
            returning id;
        `;
        return result;
    }

    async delete({ id }) {
        let [result] = await this.database`
            delete from discipline
            where id = ${id}
            returning id;
        `;
        return result;
    }
}

const disciplineRepository = new DisciplineRepository({ database: database });
export default disciplineRepository;