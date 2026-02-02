import { database } from "../../infra/database.js";

async function getRoleByNameRepository({ name }) {
    let result = await database`
        select id, name, color
        from role
        where name = ${name};
    `;
    
    return result[0] ?? null;
}

export {
    getRoleByNameRepository
}