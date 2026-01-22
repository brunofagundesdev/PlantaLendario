import { database } from "../../infra/database.js";

export function createUserRepository({ name, email, password }) { //object
    return database`
        insert into account(name, email, password)
        values (${name}, ${email}, ${password})
        returning id`;
}