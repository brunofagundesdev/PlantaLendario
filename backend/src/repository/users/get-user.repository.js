import { database } from "../../infra/database.js";

export async function getUserRepository({ id }) {
    const result = await database`
        select *
        from account
        where id = ${id}
        limit 1
    `;

    return result[0] ?? null;
}