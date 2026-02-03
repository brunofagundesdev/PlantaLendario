import { database } from "../../infra/database.js";

async function getRolesByUserIdRepository({ id }) {
    let result = await database`
        select role.id, role.name, role.color from role
            join account_role on account_role.role = role.id
        where account_role.account = ${id};
    `;

    return result;
}

export {
    getRolesByUserIdRepository
}