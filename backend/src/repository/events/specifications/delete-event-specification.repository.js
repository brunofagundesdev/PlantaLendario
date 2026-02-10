import { database } from "../../../infra/database.js";

async function deleteEventSpecificationRepository({ id }) {

    let result = await database`
        delete from event_specification
        where id = ${id}
        returning *;
    `;

    return;
}

export {
    deleteEventSpecificationRepository
}