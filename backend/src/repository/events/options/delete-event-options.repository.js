import { database } from "../../../infra/database.js";

async function deleteEventOptionRepository({ id }) {

    let result = await database`
        delete from event_option
        where id = ${id}
        returning *;
    `;

    return;
}

export {
    deleteEventOptionRepository
}