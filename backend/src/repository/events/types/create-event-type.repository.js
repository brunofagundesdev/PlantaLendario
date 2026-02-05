import { database } from "../../../infra/database.js";

async function createEventTypeRepository({name}) {
    const result = await database`
        insert into event_type(name)
        values (${name})
        returning *;
    `;

    return;
}

export {
    createEventTypeRepository
}