import eventSpecificationService from "./event-specification.service.js";
import EventSpecificationSanitizer from "./event-specification.sanitizer.js";

class EventSpecificationController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let { typeId } = request.params;
        let data = request.body;

        let sanitized = EventSpecificationSanitizer.parseCreate({ typeId, data });
        let createdEventSpecification = await this.service.create(sanitized);
        return reply.status(201).send(createdEventSpecification);

    }

    async get(request, reply) {
        let { id } = request.params;

        let sanitized = EventSpecificationSanitizer.parseGet({ id });
        let caughtEventSpecification = await eventSpecificationService.get(sanitized);

        return reply.status(200).send(caughtEventSpecification);
    }

    async list(request, reply) {
        let { typeId } = request.params;
        let listedEventSpecifications = await this.service.list({ typeId });

        return reply.status(200).send(listedEventSpecifications);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = EventSpecificationSanitizer.parseUpdate({ id, data });
        let updatedEventSpecification = await this.service.update(sanitized);
        return reply.status(200).send(updatedEventSpecification);
    }

    async delete(request, reply) {
        let { id } = request.params;

        let sanitized = EventSpecificationSanitizer.parseDelete({ id });
        let deletedEventSpecification = await eventSpecificationService.delete(sanitized);

        return reply.status(204).send(deletedEventSpecification);
    }
}

const eventSpecificationController = new EventSpecificationController({ service: eventSpecificationService });
export default eventSpecificationController;