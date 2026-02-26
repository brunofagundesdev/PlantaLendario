import { database } from "../../infra/database.js";

async function getRoleRepository({ id }) {
    let result = await database`
        select id, name, color
        from role
        where id = ${id};
    `;
    
    return result[0] ?? null;
}

export {
    getRoleRepository
}