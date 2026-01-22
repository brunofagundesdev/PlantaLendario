import { database } from "../../infra/database.js";

export async function putUserRepository({ id, body }) {
    const {
        name,
        email,
        password
    } = body;

    return await database`
        update account
        set 
            name = ${name},
            email = ${email},
            password = ${password}
        where id = ${id}
        returning id;
    `;
}