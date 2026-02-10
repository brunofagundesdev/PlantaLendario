import { database } from "../../../infra/database.js";

async function getEventTypeByNameRepository({ name }) {
    let result = await database`
        select id, name
        from event_type
        where name = ${name};
    `;

    return result[0] ?? null;
}

export {
    getEventTypeByNameRepository
}