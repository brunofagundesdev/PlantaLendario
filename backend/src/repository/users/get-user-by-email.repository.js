import { database } from "../../infra/database.js";

export function getUserByEmailRepository({ email }) {
    return database`
        select *
        from account
        where email = ${email}
        limit 1
    `;
}