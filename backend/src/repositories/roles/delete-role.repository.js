import { database } from "../../infra/database.js";

async function deleteRoleRepository({ id }) {
    let result = await database`
        delete from role
        where id = ${id};
    `;

    return;
}

export {
    deleteRoleRepository
}