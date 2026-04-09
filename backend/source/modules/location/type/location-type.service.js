import locationTypeRepository from "./location-type.repository.js";
import * as LocationTypeErrors from "./location-type.error.js";

class LocationTypeService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async create({ data }) {
        console.log("service")
        const caugthLocationTypeByName = await this.repository.get({ criteria: { name: data.name } });
        if (caugthLocationTypeByName) {
            throw new LocationTypeErrors.LocationTypeNameAlredyRegisteredError();
        }

        const createdLocationType = await this.repository.create({ data });
        return createdLocationType;
    }

    async get({ id }) {
        const caugthLocationType = await this.repository.get({ criteria: { id: id } });
        if (!caugthLocationType) {
            throw new LocationTypeErrors.LocationTypeNotFoundError();
        }

        return caugthLocationType;
    }

    async list() {
        const listedLocationTypes = await this.repository.list();
        return listedLocationTypes;
    }

    async update({ id, data }) {
        const caugthLocationType = await this.repository.get({ criteria: { id: id } });
        if (!caugthLocationType) {
            throw new LocationTypeErrors.LocationTypeNotFoundError();
        }

        if (data.name !== undefined) {
            const caughtLocationTypeByName = await this.repository.get({ criteria: { name: data.name } });
            if (caughtLocationTypeByName) {
                throw new LocationTypeErrors.LocationTypeNameAlredyRegisteredError();
            }
        }

        let updatedLocationType = await this.repository.update({ id, data });
        return updatedLocationType;
    }

    async delete({ id }) {
        const caugthLocationType = await this.repository.get({ criteria: { id } });
        if (!caugthLocationType) {
            throw new LocationTypeErrors.LocationTypeNotFoundError();
        }

        const deletedLocationType = await this.repository.delete({ id });
        return deletedLocationType;
    }
}

const locationTypeService = new LocationTypeService({ repository: locationTypeRepository });
export default locationTypeService;