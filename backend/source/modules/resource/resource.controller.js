import resourceService from "./resource.service.js";
import ResourceSanitizer from "./resource.sanitizer.js";

class ResourceController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let data = request.body;

        let sanitized = ResourceSanitizer.parseCreate({ data });

        let createdResource = await resourceService.create({
            ...sanitized,
            created_by: request.user.id
        });
        return reply.status(201).send(createdResource);
    }

    async get(request, reply) {
        let { id } = request.params;
        let sanitized = ResourceSanitizer.parseGet({ id });

        let caughtResource = await resourceService.get(sanitized);
        return reply.status(204).send(caughtResource);
    }

    async list(request, reply) {
        let listedResources = await resourceService.list();
        return reply.status(200).send(listedResources);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = ResourceSanitizer.parseUpdate({ id, data });
        let updatedResource = await resourceService.update({
            ...sanitized,
            updated_by: request.user.id
        });
        return reply.status(200).send(updatedResource);
    }

    async delete(request, reply) {
        let { id } = request.params;
        let sanitized = ResourceSanitizer.parseDelete({ id });

        let deletedResource = await resourceService.delete(sanitized);
        return reply.status(204).send();
    }
}

const resourceController = new ResourceController({ service: resourceService });
export default resourceController;