import { database } from "../../infra/database.js";

async function getEventRepository({ id }) {
    let result = await database`
        select id, title, description,
            event_type, created_at, created_by,
            updated_by, updated_at
        from event
        where id = ${id};
    `;

    return result[0] ?? null;
}

export {
    getEventRepository
}