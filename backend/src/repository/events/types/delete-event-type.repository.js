import { database } from "../../../infra/database.js";

async function deleteEventTypeRepository({ id }) {

    let result = await database`
        delete from event_type
        where id = ${id}
        returning *;
    `;
    
    return;
}

export {
    deleteEventTypeRepository
}