import { database } from "../../../infra/database.js";

async function getEventOptionRepository({ typeId }) {
    let result = await database`
        select id, event_option, name
        from event_option
        where event_type = ${typeId};
    `;

    return result;
}

export {
    getEventOptionRepository
}