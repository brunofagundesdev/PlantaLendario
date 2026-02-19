import { database } from "../../infra/database.js";

async function createEventRepository() {
    let result = await database`
        insert into event
    `;
}

export {
    createEventRepository
}