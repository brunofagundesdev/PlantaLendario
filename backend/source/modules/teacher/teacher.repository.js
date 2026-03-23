import { database } from "../../infra/database.js";

class TeacherRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        let [result] = await this.database`
            insert into teacher ${this.database(data)}
            returning id;
        `;
        return result;
    }


    async get({ criteria }) {
        let [result] = await this.database`
            select id, name, email
            from teacher
            where ${this.database.buildConditions(criteria)}
            limit 1;
        `;
        return result ?? null;
    }

    async list() {
        let result = await this.database`
            select id, name, email
            from teacher;
        `;
        return result;
    }

    async update({ id, data }) {
        let [result] = await this.database`
            update teacher
            set ${this.database(data)}
            where id = ${id}
            returning id;
        `;
        return result;
    }
    
    async delete({ id }) {
        let [result] = await this.database`
            delete from teacher
            where id = ${id}
            returning id;
        `;
        return result;
    }
}

const teacherRepository = new TeacherRepository({ database: database });
export default teacherRepository;