import { database } from "../../../infra/database.js";
import CaseTransform from "../../../utils/case-transform.js";

class LocationTypeRepository {
    constructor({ database }) {
        this.database = database;
    }

    async create({ data }) {
        const [result] = await this.database`
            insert into location_type ${this.database(CaseTransform.camelToSnake(data))}
            returning id;
        `;
        return CaseTransform.snakeToCamel(result);
    }

    async get({ criteria }) {
        const [result] = await this.database`
            select id, name
            from location_type
            where ${this.database.buildQuery(criteria)}
            limit 1;
        `;
        return CaseTransform.snakeToCamel(result) ?? null;
    }

    async list() {
        const result = await this.database`
            select id, name
            from location_type;
        `;
        return CaseTransform.snakeToCamelArray(result);
    }

    async update({ id, data }) {
        const [result] = await this.database`
            update location_type
            set ${this.database(CaseTransform.camelToSnake(data))}
            where id = ${id}
            returning id;
        `;
        return CaseTransform.snakeToCamel(result);
    }

    async delete({ id }) {
        const [result] = await this.database`
            delete from location_type
            where id = ${id}
            returning id;
        `;
        return CaseTransform.snakeToCamel(result);
    }
}

const locationTypeRepository = new LocationTypeRepository({ database: database });
export default locationTypeRepository;