import { database } from "../../infra/database.js";

async function getTeachersRepository() {
    let result = await database`
        select id, name, email, telephone
        from teacher
        ;
    `;

    return result;
}

export {
    getTeachersRepository
}