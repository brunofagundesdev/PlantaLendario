/**
 * @typedef {import('./announcement.type.js').Announcement} Announcement
 * @typedef {import('./announcement.type.js').AnnouncementCriteria} AnnouncementCriteria
*/

import { database } from "../../infra/database.js";
import CaseTransform from "../../utils/case-transform.js";

class AnnouncementRepository {
    /**
     * Cria um novo aviso.
     *
     * @param {Object} params
     * @param {Object} params.data
     * @param {string} params.data.title
     * @param {string} params.data.message
     * @returns {Promise<Announcement>}
    */
    async create({ data }) {
        let { title, message, createdBy } = data;
        let [result] = await database`
            insert into announcement (title, message, created_by)
            values(${title}, ${message}, ${createdBy})
            returning id, title, message, created_at, created_by, updated_at, updated_by;
        `;

        return CaseTransform.snakeToCamel(result);
    }

    /**
     * Busca um aviso pelo ID.
     *
     * @param {{ id: string }} params
     * @returns {Promise<Announcement|null>}
    */
    async getById({ id }) {
        let [result] = await database`
            select id, title, message, created_at, created_by, updated_at, updated_by 
            from announcement
            where id = ${id}
            limit 1;
        `;
        return CaseTransform.snakeToCamel(result) ?? null;
    }

    /**
     * Verifica se existe um aviso com base em critérios.
     *
     * @param {{ criteria: AnnouncementCriteria }} params
     * @returns {Promise<Boolean>}
    */
    async exists({ criteria }) {
        let result = await database`
            select 1
            from announcement
            where ${database.buildQuery(CaseTransform.camelToSnake(criteria))}
            limit 1;
        `;
        return result.length > 0;
    }

    /**
     * Lista todos os avisos.
     *
     * @returns {Promise<Announcement[]>}
    */
    async list() {
        let result = await database`
            select id, title, message, created_at, created_by, updated_at, updated_by 
            from announcement;
        `;
        return CaseTransform.snakeToCamelArray(result);
    }

    /**
     * Atualiza um aviso.
     *
     * @param {Object} params
     * @param {Object} params.data
     * @param {string} params.data.title
     * @param {string} params.data.message
     * @param {string} params.data.updatedBy
     * @returns {Promise<Announcement>}
    */
    async update({ id, data }) {
        let [result] = await database`
            update announcement
            set ${database(CaseTransform.camelToSnake(data))}, updated_at = now()
            where id = ${id}
            returning id, title, message, created_at, created_by, updated_at, updated_by;
        `;
        return CaseTransform.snakeToCamel(result) ?? null;
    }

    /**
     * Deleta um aviso.
     *
     * @param {Object} params
     * @param {string} params.id
     * @returns {Promise<Boolean>}
    */
    async delete({ id }) {
        let result = await database`
            delete from announcement
            where id = ${id}
            returning id;
        `;
        return result.length > 0;
    }
}

const announcementRepository = new AnnouncementRepository({ database: database });
export default announcementRepository;