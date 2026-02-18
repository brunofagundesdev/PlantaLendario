import { database } from "../../../infra/database.js";

async function createEventOptionRepository({ specificationId, name }) {
    let result = await database`
        insert into event_option(event_specification, name)
        values (${specificationId}, ${name})
        returning id, event_specification, name;
    `;

    return result[0];
}

export {
    createEventOptionRepository
}