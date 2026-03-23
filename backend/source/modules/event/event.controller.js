import eventService from "./event.service.js";
import EventSanitizer from "./event.sanitizer.js";

class EventController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let data = request.body;

        let sanitized = EventSanitizer.parseCreate({ data });

        let createdEvent = await eventService.create(sanitized);
        return reply.status(201).send(createdEvent);
    }

    async delete(request, reply) {
        let { id } = request.params;
        let sanitized = EventSanitizer.parseDelete({ id });

        let deletedEvent = await eventService.delete(sanitized);
        return reply.status(204).send();
    }

    async get(request, reply) {
        let { id } = request.params;
        let sanitized = EventSanitizer.parseGet({ id });

        let caughtEvent = await eventService.get(sanitized);
        return reply.status(200).send(caughtEvent);
    }

    async list(request, reply) {
        let listedEvents = await eventService.list();
        return reply.status(200).send(listedEvents);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = EventSanitizer.parseUpdate({ id, data });
        let updatedEvent = await eventService.update(sanitized);
        return reply.status(200).send(updatedEvent);

    }
}

const eventController = new EventController({ service: eventService });
export default eventController;