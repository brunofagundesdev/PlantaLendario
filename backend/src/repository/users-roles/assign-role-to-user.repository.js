import { database } from "../../infra/database.js";

async function assignRoleRepository({ userId, roleId }) {

    let result = await database`
        insert into account_role(account, role)
        values (${userId}, ${roleId})
        returning *;
    `;

    return;
}

export {
    assignRoleRepository
}