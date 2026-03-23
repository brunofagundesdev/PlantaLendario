import eventOptionService from "./event-option.service.js";
import EventOptionSanitizer from "./event-option.sanitizer.js";

class EventOptionController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let { typeId } = request.params;
        let data = request.body;

        let sanitized = EventOptionSanitizer.parseCreate({ typeId, data });
        let createdEventOption = await this.service.create(sanitized);
        return reply.status(201).send(createdEventOption);

    }

    async get(request, reply) {
        let { id } = request.params;

        let sanitized = await EventOptionSanitizer.parseGet({ id });
        let caughtEventOption = await eventOptionService.get(sanitized);

        return reply.status(200).send(caughtEventOption);
    }

    async list(request, reply) {
        let { typeId } = request.params;
        let listedEventOptions = await this.service.list({ typeId });

        return reply.status(200).send(listedEventOptions);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = EventOptionSanitizer.parseUpdate({ id, data });
        let updatedEventOption = await this.service.update(sanitized);
        return reply.status(200).send(updatedEventOption);
    }

    async delete(request, reply) {
        let { id } = request.params;

        let sanitized = await EventOptionSanitizer.parseDelete({ id });
        let deletedEventOption = await eventOptionService.delete(sanitized);

        return reply.status(204).send();
    }
}

const eventOptionController = new EventOptionController({ service: eventOptionService });
export default eventOptionController;