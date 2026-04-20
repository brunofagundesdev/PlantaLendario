/**
 * @typedef {import('./discipline.type.js').Discipline} Discipline
 * @typedef {import('./discipline.type.js').DisciplineCriteria} DisciplineCriteria
*/

import { database } from "../../infra/database.js";
import CaseTransform from "../../utils/case-transform.js";

class DisciplineRepository {

    /**
     * Cria uma nova disciplina.
     *
     * @param {Object} params
     * @param {Object} params.data
     * @param {string} params.data.name
     * @returns {Promise<Discipline>}
    */
    async create({ data }) {
        let [result] = await database`
            insert into discipline ${database(CaseTransform.camelToSnake(data))}
            returning id, name;
        `;
        return CaseTransform.snakeToCamel(result);
    }

    /**
     * Busca uma disciplina pelo ID.
     *
     * @param {{ id: string }} params
     * @returns {Promise<Discipline|null>}
    */
    async getById({ id }) {
        let [result] = await database`
            select id, name
            from discipline
            where id = ${id}
            limit 1;
        `;
        return CaseTransform.snakeToCamel(result) ?? null;
    }

    /**
     * Verifica se existe uma disciplina com base em critérios.
     *
     * @param {{ criteria: DisciplineCriteria }} params
     * @returns {Promise<Boolean>}
    */
    async exists({ criteria }) {
        let result = await database`
            select 1
            from discipline
            where ${database.buildQuery(CaseTransform.camelToSnake(criteria))}
            limit 1;
        `;
        return result.length > 0;
    }

    /**
     * Lista todas as disciplinas.
     *
     * @returns {Promise<Discipline[]>}
    */
    async list() {
        let result = await database`
            select id, name
            from discipline;
        `;
        return CaseTransform.snakeToCamelArray(result);
    }

    /**
     * Atualiza uma disciplina.
     *
     * @param {Object} params
     * @param {string} params.id
     * @param {Object} params.data
     * @param {string} [params.data.name]
     * @returns {Promise<Discipline>}
    */
    async update({ id, data }) {
        let [result] = await database`
            update discipline
            set ${database(CaseTransform.camelToSnake(data))}
            where id = ${id}
            returning id, name;
        `;
        return CaseTransform.snakeToCamel(result);
    }

    /**
     * Deleta uma disciplina.
     *
     * @param {{ id: string }} params
     * @returns {Promise<Boolean>}
    */
    async delete({ id }) {
        let result = await database`
            delete from discipline
            where id = ${id}
            returning id;
        `;
        return result.length > 0;
    }
}

const disciplineRepository = new DisciplineRepository();
export default disciplineRepository;