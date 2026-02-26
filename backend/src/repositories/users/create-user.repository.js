import { database } from "../../infra/database.js";

async function createUserRepository({ name, email, password }) { //object
    let result = await database`
        insert into account(name, email, password)
        values (${name}, ${email}, ${password})
        returning id
    `;
    return result;
}

export {
    createUserRepository
}