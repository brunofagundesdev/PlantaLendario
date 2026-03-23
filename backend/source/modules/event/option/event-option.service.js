import eventOptionRepository from "./event-option.repository.js";
import eventSpecificationRepository from "../specification/event-specification.repository.js";

import * as EventOptionErrors from "./event-option.error.js";
import * as EventSpecificationErrors from "../specification/event-specification.error.js";

class EventOptionService {
    constructor({ repository, dependencies }) {
        this.repository = repository;
        this.dependencies = dependencies;
    }

    async create({ specificationId, data }) {
        const caughtEventSpecification = await this.dependencies.eventSpecificationRepository.get({ criteria: { id: specificationId } });
        if (!caughtEventSpecification) {
            throw new EventSpecificationErrors.EventSpecificationNotFoundError();
        }

        const caughtEventOptionByName = await this.repository.get({ criteria: { event_specification: specificationId, name: data.name } });
        if (caughtEventOptionByName) {
            throw new EventOptionErrors.EventOptionNameAlredyRegisteredError();
        }

        const createdEventOption = await this.repository.create({ specificationId, name: data.name });
        return createdEventOption;
    }

    async get({ id }) {
        const caughtEventOption = await this.repository.get({ criteria: { id: id } });
        if (!caughtEventOption) {
            throw new EventOptionErrors.EventOptionNotFoundError();
        }

        return caughtEventOption;
    }

    async list({ specificationId }) {
        let caughtEventSpecification = await this.dependencies.eventOptionRepository.get({ criteria: { id: specificationId } });
        if (!caughtEventSpecification) {
            throw new EventOptionErrors.EventOptionNotFoundError();
        }

        let listedEventOptions = await this.repository.list({ specificationId });
        return listedEventOptions;
    }

    async update({ id, data }) {
        const caughtEventOption = await this.repository.get({ criteria: { id: id } });
        if (!caughtEventOption) {
            throw new EventOptionErrors.EventOptionNotFoundError();
        }

        const caughtEventOptionByName = await this.repository.get({ criteria: { name: data.name } });
        if (caughtEventOptionByName) {
            throw new EventOptionErrors.EventOptionNameAlredyRegisteredError();
        }

        const updatedEventOption = await this.repository.update({ id, data });
        return updatedEventOption;
    }

    async delete({ id }) {
        let caughtEventOption = await this.repository.get({ criteria: { id } });
        if (!caughtEventOption) {
            throw new EventOptionErrors.EventOptionNotFoundError();
        }

        const deletedEventOption = await this.repository.delete({ id });
        return deletedEventOption;
    }
}

const eventOptionService = new EventOptionService({ repository: eventOptionRepository, dependencies: { eventSpecificationRepository } });
export default eventOptionService;