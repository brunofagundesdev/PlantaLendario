import { database } from "../../../infra/database.js";

async function getEventSpecificationByNameRepository({ name }) {
    let result = await database`
        select id, event_type, name
        from event_specification
        where name = ${name};
    `;

    return result[0] ?? null;
}

export {
    getEventSpecificationByNameRepository
}