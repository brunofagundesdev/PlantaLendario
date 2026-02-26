import { database } from "../../../infra/database.js";

async function getEventSpecificationRepository({ id }) {

    let result = await database`
        select id, event_type, name
        from event_specification
        where id = ${id};
    `;

    return result[0] ?? null;
}

export {
    getEventSpecificationRepository
}