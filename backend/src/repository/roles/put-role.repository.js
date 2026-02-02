import { database } from "../../infra/database.js";

async function putRoleRepository({ id, name, color }) {
    let result = await database`
        update role
        set 
            name = ${name},
            color = ${color}
        where id = ${id}
        returning id;
    `;

    return result[0] ?? null;

}

export {
    putRoleRepository
}