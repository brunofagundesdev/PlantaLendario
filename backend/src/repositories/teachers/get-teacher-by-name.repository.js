import { database } from "../../infra/database.js";

async function getTeacherByNameRepository({ name }) {
    let result = await database`
        select id, name, email, telephone
        from teacher
        where name = ${name}
        ;
    `;

    return result[0] ?? null;
}

export {
    getTeacherByNameRepository
}