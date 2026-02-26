import { database } from "../../infra/database.js";

async function getUserByNameRepository({ name }) {
    let result = await database`
        select id, name, email
        from account
        where lower(name) = lower(${name});
    `;

    return result[0] ?? null;
}

export {
    getUserByNameRepository
}