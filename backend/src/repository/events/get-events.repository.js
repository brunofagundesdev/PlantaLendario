import { database } from "../../infra/database.js";

async function getEventsRepository() {
    let result = await database`
        select id, title, description, event_type,
            created_at, created_by, updated_at
        from event
    `;

    return result;
}

export {
    getEventsRepository
}