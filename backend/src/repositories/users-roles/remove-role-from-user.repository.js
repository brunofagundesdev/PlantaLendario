import { database } from "../../infra/database.js";

async function removeRoleFromUserRepository({ userId, roleId }) {

    let result = await database`
        delete from account_role
        where account = ${userId} and role = ${roleId}
        returning *;
    `;

    return;
}

export {
    removeRoleFromUserRepository
}