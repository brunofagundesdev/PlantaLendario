import { database } from "../../../infra/database.js";

async function getEventTypesRepository() {
    let result = await database`
        select id, name
        from event_type;
    `;
    return result;
}

export {
    getEventTypesRepository
}