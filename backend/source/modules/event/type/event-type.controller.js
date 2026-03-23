import eventTypeService from "./event-type.service.js";
import EventTypeSanitizer from "./event-type.sanitizer.js";

class EventTypeController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = EventTypeSanitizer.parseCreate({ id, data });
        let createdEventType = await this.service.create(sanitized);
        return reply.status(201).send(createdEventType);

    }

    async get(request, reply) {
        let { id } = request.params;

        let sanitized = await EventTypeSanitizer.parseGet({ id });
        let caughtEventType = await eventTypeService.get(sanitized);

        return reply.status(200).send(caughtEventType);
    }

    async list(request, reply) {
        let listedEventTypes = await this.service.list();

        return reply.status(200).send(listedEventTypes);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = EventTypeSanitizer.parseUpdate({ id, data });
        let updatedEventType = await this.service.update(sanitized);
        return reply.status(201).send(updatedEventType);
    }

    async delete(request, reply) {
        let { id } = request.params;

        let sanitized = await EventTypeSanitizer.parseDelete({ id });
        let deletedEventType = await eventTypeService.delete(sanitized);

        return reply.status(204).send();
    }
}

const eventTypeController = new EventTypeController({ service: eventTypeService });
export default eventTypeController;