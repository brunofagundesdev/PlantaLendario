import eventRepository from "./event.repository.js";

class EventService {
    constructor({ repository }) {
        this.repository = repository;
    }


}

const eventService = new EventService({ repository: eventRepository });
export default eventService;