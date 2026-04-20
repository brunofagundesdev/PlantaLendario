/**
 * @typedef {import('./location.type.js').Location} Location
 * @typedef {import('./location.type.js').LocationCriteria} LocationCriteria
*/

import { database } from "../../infra/database.js";
import CaseTransform from "../../utils/case-transform.js";

class LocationRepository {
    constructor({ database }) {
        this.database = database;
    }

    /**
     * Cria uma nova localização.
     *
     * @param {Object} params
     * @param {Object} params.data
     * @param {string} params.data.name
     * @param {string} params.data.type
     * @param {string|null} params.data.parentId
     * @returns {Promise<Location>}
    */
    async create({ data }) {
        const [result] = await this.database`
            insert into location ${this.database(CaseTransform.camelToSnake(data))}
            returning id, name, type, parent_id, normalized_name;
        `;
        return CaseTransform.snakeToCamel(result);
    }


    /**
     * Busca uma localização com base em critérios.
     * Retorna o primeiro resultado encontrado.
     *
     * @param {{ criteria: LocationCriteria }} params
     * @returns {Promise<Location|null>}
    */
    async get({ criteria }) {
        let [result] = await this.database`
            select id, name, type, parent_id, normalized_name
            from location
            where ${this.database.buildQuery(CaseTransform.camelToSnake(criteria))}
            limit 1;
        `;
        return CaseTransform.snakeToCamel(result) ?? null;
    }

    /**
     * Lista todas localizações.
     *
     * @returns {Promise<Location>}
    */
    async list() {
        let result = await this.database`
            select id, name, type, parent_id, normalized_name
            from location;
        `;
        return CaseTransform.snakeToCamelArray(result);
    }

    async update({ id, data }) {
        let [result] = await this.database`
            update location
            set ${this.database(CaseTransform.camelToSnake(data))}
            where id = ${id}
            returning id;
        `;
        return CaseTransform.snakeToCamel(result);
    }

    async delete({ id }) {
        let [result] = await this.database`
            delete from location
            where id = ${id}
            returning id;
        `;
        return CaseTransform.snakeToCamel(result);
    }
}

const locationRepository = new LocationRepository({ database: database });
export default locationRepository;