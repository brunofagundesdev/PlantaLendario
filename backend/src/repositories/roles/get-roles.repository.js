import { database } from "../../infra/database.js";

async function getRolesRepository() {
    
    let result = await database`
        select id, name, color
        from role;
    `;

    return result;
}

export {
    getRolesRepository
}