import { database } from "../../infra/database.js";

export async function deleteUserRepository({ id }) {
    const result = await database`
        delete from account
        where id = ${id}
        returning *;
    `;
    return result[0] ?? null;
}