import locationTypeService from "./location-type.service.js";
import LocationTypeSanitizer from "./location-type.sanitizer.js";

class LocationTypeController {
    constructor({ service }) {
        this.service = service;
    }
    
    async create(request, reply) {
        let data = request.body;
        
        let sanitized = LocationTypeSanitizer.parseCreate({ data });
        let createdLocationType = await this.service.create(sanitized);
        return reply.status(201).send(createdLocationType);
    }

    async get(request, reply) {
        let { id } = request.params;

        let sanitized = LocationTypeSanitizer.parseGet({ id });
        let caughtLocationType = await this.service.get(sanitized);

        return reply.status(200).send(caughtLocationType);
    }

    async list(request, reply) {
        let listedLocationTypes = await this.service.list();

        return reply.status(200).send(listedLocationTypes);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = LocationTypeSanitizer.parseUpdate({ id, data });
        let updatedLocationType = await this.service.update(sanitized);
        return reply.status(201).send(updatedLocationType);
    }

    async delete(request, reply) {
        let { id } = request.params;

        let sanitized = LocationTypeSanitizer.parseDelete({ id });
        let deletedLocationType = await this.service.delete(sanitized);

        return reply.status(204).send(deletedLocationType);
    }
}

const locationTypeController = new LocationTypeController({ service: locationTypeService });
export default locationTypeController;