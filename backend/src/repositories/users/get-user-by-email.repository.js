import { database } from "../../infra/database.js";

export async function getUserByEmailRepository({ email }) {
    const result = await database`
        select *
        from account
        where email = ${email}
        limit 1
    `;
    
    return result[0] ?? null;
}