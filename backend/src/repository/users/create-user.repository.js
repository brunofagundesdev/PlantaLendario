import { database } from "../../infra/database.js";

export function createUserRepository(user) { //object
    database`
        insert into user
        `;
}