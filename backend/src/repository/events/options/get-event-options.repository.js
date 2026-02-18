import { database } from "../../../infra/database.js";

async function getEventOptionsRepository({ specificationId }) {
    let result = await database`
        select id, event_option, name
        from event_option
        where event_specification = ${specificationId};
    `;

    return result;
}

export {
    getEventOptionsRepository
}