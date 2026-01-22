import { database } from "../../infra/database.js";

export function getUserByIdRepository({ id }) {
    return database`
        select *
        from account
        where id = ${id}
        limit 1
    `;
}