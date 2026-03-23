import { database } from "../../infra/database.js";


class EventRepository {
    constructor({ database }) {
        this.database = database;
    }
}

const eventRepository = new EventRepository({ database: database });
export default eventRepository;