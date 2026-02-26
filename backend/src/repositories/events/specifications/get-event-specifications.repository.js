import { database } from "../../../infra/database.js";

async function getEventSpecificationsRepository({ typeId }) {
    let result = await database`
        select id, event_type, name
        from event_specification
        where event_type = ${typeId};
    `;

    return result;
}

export {
    getEventSpecificationsRepository
}