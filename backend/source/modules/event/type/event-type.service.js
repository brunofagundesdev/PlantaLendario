import eventTypeRepository from "./event-type.repository.js";
import * as EventTypeErrors from "./event-type.error.js";

class EventTypeService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async create({ data }) {
        const caugthEventTypeByName = await this.repository.get({ criteria: { name: data.name } });
        if (caugthEventTypeByName) {
            throw new EventTypeErrors.EventTypeNameAlredyRegisteredError();
        }

        const createdEventType = await this.repository.create({ data });
        return createdEventType;
    }

    async get({ id }) {
        const caugthEventType = await this.repository.get({ criteria: { id: id } });
        if (!caugthEventType) {
            throw new EventTypeErrors.EventTypeNotFoundError();
        }

        return caugthEventType;
    }

    async list() {
        const listedEventTypes = await this.repository.list();
        return listedEventTypes;
    }

    async update({ id, data }) {
        const caugthEventType = await this.repository.get({ criteria: { id: id } });
        if (!caugthEventType) {
            throw new EventTypeErrors.EventTypeNotFoundError();
        }

        if (data.name !== undefined) {
            const caughtEventTypeByName = await this.repository.get({ criteria: { name: data.name } });
            if (caughtEventTypeByName) {
                throw new EventTypeErrors.EventTypeNameAlredyRegisteredError();
            }
        }

        let updatedEventType = await this.repository.update({ id, data });
        return updatedEventType;
    }

    async delete({ id }) {
        const caugthEventType = await this.repository.get({ criteria: { id } });
        if (!caugthEventType) {
            throw new EventTypeErrors.EventTypeNotFoundError();
        }

        const deletedEventType = await this.repository.delete({ id });
        return deletedEventType;
    }
}

const eventTypeService = new EventTypeService({ repository: eventTypeRepository });
export default eventTypeService;