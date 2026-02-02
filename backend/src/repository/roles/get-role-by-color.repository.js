import { database } from "../../infra/database.js";

async function getRoleByColorRepository({ color }) {
    let result = await database`
        select id, name, color
        from role
        where color = ${color};
    `;
    
    return result[0] ?? null;
}

export {
    getRoleByColorRepository
}