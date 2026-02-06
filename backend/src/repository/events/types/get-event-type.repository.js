import { database } from "../../../infra/database.js"

async function getEventTypeRepository({ id }) {
    let result = await database`
        select id, name 
        from event_type
        where id = ${id};
    `;

    return result[0] ?? null;
}

export {
    getEventTypeRepository
}