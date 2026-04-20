/**
 * @typedef {import('./teacher.type.js').Teacher} Teacher
*/

import { database } from "../../infra/database.js";
import CaseTransform from "../../utils/case-transform.js";

class TeacherRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        let [result] = await this.database`
            insert into teacher ${this.database(CaseTransform.camelToSnake(data))}
            returning id, name, email, telephone;
        `;
        return CaseTransform.snakeToCamel(result);
    }

    async get({ criteria }) {
        let [result] = await this.database`
            select id, name, email, telephone
            from teacher
            where ${this.database.buildConditions(CaseTransform.camelToSnake(criteria))}
            limit 1;
        `;
        return CaseTransform.snakeToCamel(result) ?? null;
    }

    async list() {
        let result = await this.database`
            select id, name, email
            from teacher;
        `;
        return CaseTransform.snakeToCamelArray(result);
    }

    async update({ id, data }) {
        let [result] = await this.database`
            update teacher
            set ${this.database(CaseTransform.camelToSnake(data))}
            where id = ${id}
            returning id, name, email, telephone;
        `;
        return CaseTransform.snakeToCamel(result);
    }

    async delete({ id }) {
        let result = await this.database`
            delete from teacher
            where id = ${id}
            returning id;
        `;
        return result.length > 0;
    }


    //* ====================== AUXILIARES ====================================

    /**
     * Busca professores vinculados a uma disciplina.
     *
     * @param {Object} params
     * @param {string} params.id - Id da disciplina
     * @returns {Promise<Teacher[]>}
    */
    async listByDiscipline({ id }) {
        let result = await this.database`
            select teacher.id, teacher.name, teacher.email, teacher.telephone
            from teacher
                join discipline_teacher on discipline_teacher.teacher = teacher.id
            where discipline_teacher.discipline = ${id};
        `;
        return result;
    }
}

const teacherRepository = new TeacherRepository({ database: database });
export default teacherRepository;