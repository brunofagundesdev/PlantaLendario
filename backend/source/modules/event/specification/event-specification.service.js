import eventSpecificationRepository from "./event-specification.repository.js";
import eventTypeRepository from "../type/event-type.repository.js";

import * as EventTypeErrors from "../type/event-type.error.js";
import * as EventSpecificationErrors from "../specification/event-specification.error.js";

class EventSpecificationService {
    constructor({ repository, dependencies }) {
        this.repository = repository;
        this.dependencies = dependencies;
    }

    async create({ typeId, data }) {
        const caughtEventType = await this.dependencies.eventTypeRepository.get({ criteria: { id: typeId } });
        if (!caughtEventType) {
            throw new EventTypeErrors.EventTypeNotFoundError();
        }

        const caughtEventSpecificationByName = await this.repository.get({ criteria: { event_type: typeId, name: data.name } });
        if (caughtEventSpecificationByName) {
            throw new EventSpecificationErrors.EventSpecificationNameAlredyRegisteredError();
        }

        const eventSpecification = await this.repository.create({ typeId, name: data.name });
        return eventSpecification;
    }

    async get({ id }) {
        const caughtEventSpecificaton = await this.repository.get({ criteria: { id: id } });
        if (!caughtEventSpecificaton) {
            throw new EventSpecificationErrors.EventSpecificationNotFoundError();
        }

        return caughtEventSpecificaton;
    }

    async list({ typeId }) {
        let caughtEventType = await this.dependencies.eventTypeRepository.get({ criteria: { id: typeId } });
        if (!caughtEventType) {
            throw new EventTypeErrors.EventTypeNotFoundError();
        }

        let listedEventSpecifications = await this.repository.list({ typeId });
        return listedEventSpecifications;
    }

    async update({ id, data }) {
        const caughtEventSpecification = await this.repository.get({ criteria: { id: id } });
        if (!caughtEventSpecification) {
            throw new EventSpecificationErrors.EventSpecificationNotFoundError();
        }

        const caughtEventSpecificationByName = await this.repository.get({ criteria: { name: data.name } });
        if (caughtEventSpecificationByName) {
            throw new EventSpecificationErrors.EventSpecificationNameAlredyRegisteredError();
        }

        const updatedEventSpecification = await this.repository.update({ id, data });
        return updatedEventSpecification;
    }

    async delete({ id }) {
        let caughtEventSpecification = await this.repository.get({ criteria: { id } });
        if (!caughtEventSpecification) {
            throw new EventSpecificationErrors.EventSpecificationNotFoundError();
        }

        const deletedEventSpecification = await this.repository.delete({ id: id });
        return deletedEventSpecification;
    }
}

const eventSpecificationService = new EventSpecificationService({ repository: eventSpecificationRepository, dependencies: { eventTypeRepository } });
export default eventSpecificationService;