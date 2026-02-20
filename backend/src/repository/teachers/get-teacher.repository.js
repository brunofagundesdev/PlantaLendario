import { database } from "../../infra/database.js";

async function getTeacherRepository({ id }) {

    let result = await database`
        select id, name, email, telephone
        from teacher
        where id = ${id}
        ; 
    `;

    return result[0] ?? null;
}

export {
    getTeacherRepository
}