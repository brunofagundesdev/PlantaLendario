import { database } from "../../infra/database.js";

export async function patchUserRepository({ id, body }) {
    const {
        name = null,
        email = null,
        password = null
    } = body;

    let clauses = [];

    console.log(body)
    console.log(name, email, password)
    if (name !== null) clauses.push(database`name = ${name}`);
    if (email !== null) clauses.push(database`email = ${email}`);
    if (password !== null) clauses.push(database`password = ${password}`);

    let setClause = clauses[0];

    for (let i = 1; i < clauses.length; i++) {
        setClause = database`${setClause}, ${clauses[i]}`;
    }

    return await database`
        update account
        set ${setClause}
        where id = ${id}
        returning id;
    `;
}