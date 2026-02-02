import { database } from "../../infra/database.js";

async function createRoleRepository({ name, color = "#000000" }) {
    let result = await database`
        insert into role(name, color)
        values (${name}, ${color})
        returning id;
    `;

    return result;
}

export { createRoleRepository }