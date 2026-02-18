import { database } from "../../../infra/database.js";

async function createEventOptionRepository({ typeId, name }) {
    let result = await database`
        insert into event_option(event_option, name)
        values (${typeId}, ${name})
        returning id, event_option, name;
    `;

    return result[0];
}

export {
    createEventOptionRepository
}