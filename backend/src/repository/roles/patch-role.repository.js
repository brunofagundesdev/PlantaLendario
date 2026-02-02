import { database } from "../../infra/database.js";

async function patchRoleRepository({ id, body = {} }) {
    let { name = null, color = null } = body;

    let clauses = [];

    if (name !== null) clauses.push(database`name = ${name}`);
    if (color !== null) clauses.push(database`color = ${color}`);

    let setClause = clauses[0];

    for (let i = 1; i < clauses.length; i++) {
        setClause = database`${setClause}, ${clauses[i]}`;
    }

    let result = await database`
        update role
        set ${setClause}
        where id = ${id}
        returning id, name, color;
    `;

    return result[0] ?? null;
}

export {
    patchRoleRepository
}