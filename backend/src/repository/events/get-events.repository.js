import { database } from "../../infra/database.js";

export function getAllEvents() {
    database`
        select *
        from event`;
}