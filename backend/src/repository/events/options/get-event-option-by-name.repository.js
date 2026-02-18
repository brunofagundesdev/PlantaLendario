import { database } from "../../../infra/database.js";

async function getEventOptionByNameRepository({ name }) {
    let result = await database`
        select id, event_option, name
        from event_option
        where name = ${name};
    `;

    return result[0] ?? null;
}

export {
    getEventOptionByNameRepository
}