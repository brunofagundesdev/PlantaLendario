import { database } from "../../infra/database.js";

async function deleteTeacherRepository({ id }) {
    let result = await database`
        delete from teacher
        where id = ${id}
        returning *;
    `;

    return;
}

export {
    deleteTeacherRepository
}