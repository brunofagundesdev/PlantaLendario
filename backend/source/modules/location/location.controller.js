import locationService from "./location.service.js";
import LocationSanitizer from "./location.sanitizer.js";

class LocationController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let data = request.body;

        let sanitized = LocationSanitizer.parseCreate({ data });

        let createdLocation = await locationService.create(sanitized);
        return reply.status(201).send(createdLocation);
    }

    async delete(request, reply) {
        let { id } = request.params;
        let sanitized = LocationSanitizer.parseDelete({ id });

        let deletedLocation = await locationService.delete(sanitized);
        return reply.status(204).send();
    }

    async get(request, reply) {
        let { id } = request.params;
        let sanitized = LocationSanitizer.parseGet({ id });

        let caughtLocation = await locationService.get(sanitized);
        return reply.status(204).send(caughtLocation);
    }

    async list(request, reply) {
        let listedLocations = await locationService.list();
        return reply.status(200).send(listedLocations);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = LocationSanitizer.parseUpdate({ id, data });
        let updatedLocation = await locationService.update(sanitized);
        return reply.status(200).send(updatedLocation);

    }
}

const locationController = new LocationController({ service: locationService });
export default locationController;