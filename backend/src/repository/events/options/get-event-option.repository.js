import { database } from "../../../infra/database.js";

async function getEventOptionRepository({ id }) {

    let result = await database`
        select id, event_type, name
        from event_option
        where id = ${id};
    `;

    return result[0] ?? null;
}

export {
    getEventOptionRepository
}