import { database } from "../../infra/database.js";

class AnnouncementRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        const result = await this.database`
            insert into announcement ${this.database(data)}
            returning id;
        `;
        return result;
    }

    async get({ criteria }) {
        let [result] = await this.database`
            select id, title, message, created_at, created_by, updated_at, updated_by 
            from announcement
            where ${this.database.buildConditions(criteria)}
            limit 1;
        `;
        return result ?? null;
    }

    async list() {
        let [result] = await this.database`
            select id, title, message, created_at, created_by, updated_at, updated_by 
            from announcement;
        `;
        return result;
    }

    async update({ id, data }) {
        let [result] = await this.database`
            update announcement
            set ${this.database(data)}, updated_at = now()
            where id = ${id}
            returning id;
        `;
        return result;
    }

    async delete({ id }) {
        let [result] = await this.database`
            delete from announcement
            where id = ${id}
            returning id;
        `;
        return result;
    }
}

const announcementRepository = new AnnouncementRepository({ database: database });
export default announcementRepository;