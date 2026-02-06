import { database } from "../../../infra/database.js";

async function patchEventTypeRepository({ id, body }) {
    const {
        name = null,
    } = body;

    let clauses = [];

    if (name !== null) clauses.push(database`name = ${name}`);

    let setClause = clauses[0];

    for (let i = 1; i < clauses.length; i++) {
        setClause = database`${setClause}, ${clauses[i]}`;
    }

    let result = await database`
        update event_type
        set ${setClause}
        where id = ${id}
        returning id;
    `;

    return result;
}

export {
    patchEventTypeRepository
}