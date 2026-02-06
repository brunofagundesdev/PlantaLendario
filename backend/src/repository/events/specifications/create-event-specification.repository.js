import { database } from "../../../infra/database.js";

async function createEventSpecificationRepository({ typeId, body }) {
    const { name } = body;

    let result = await database`
        insert into event_specification(event_type, name)
        values (${typeId}, ${name})
        returning id, event_type, name;
    `;

    return result[0];
}

export {
    createEventSpecificationRepository
}