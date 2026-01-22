import { database } from "../../infra/database.js";

export async function deleteUserRepository({ id }) {
    await database`
        delete from account
        where id = ${id}
        returning *;
    `;
}