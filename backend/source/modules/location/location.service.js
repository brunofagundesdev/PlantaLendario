import locationRepository from "./location.repository.js";
import * as LocationErrors from "./location.error.js";

class LocationService {
    constructor({ repository }) {
        this.repository = repository;
        this.locationTypes = ['room', 'pavilion', 'sub', 'special', 'outside'];
    }

    async create({ data }) {
        const caughtLocationByName = await this.repository.get({ criteria: { normalizedName: data.normalizedName } });
        if (caughtLocationByName) {
            throw new LocationErrors.LocationNameAlredyRegisteredError();
        }

        if (data.parentId !== undefined) {
            const caughtLocationParent = await this.repository.get({ criteria: { id: data.parentId } });
            if (!caughtLocationParent) {
                throw new LocationErrors.LocationParentNotFoundError();
            }
        }
        console.log(data)
        // let createdLocation = await this.repository.create({ data });
        // return createdLocation;
    }

    async get({ id }) {
        const caughtLocation = await this.repository.get({ criteria: { id } });
        if (!caughtLocation) {
            throw new LocationErrors.LocationNotFoundError();
        }
        return caughtLocation;
    }

    async list() {
        const listedLocations = await this.repository.list();
        return listedLocations;
    }

    async update({ id, data }) {
        const caughtLocation = await this.repository.get({ criteria: { id } });
        if (!caughtLocation) {
            throw new LocationErrors.LocationNotFoundError();
        }

        const caughtLocationByName = await this.repository.get({ criteria: { name: data.name } });
        if (caughtLocationByName) {
            throw new LocationErrors.LocationNameAlredyRegisteredError();
        }



        let updatedLocation = await this.repository.update({ id, data });
        return updatedLocation;
    }

    async delete({ id }) {
        const caughtLocation = await this.repository.get({ criteria: { id } });
        if (!caughtLocation) {
            throw new LocationErrors.LocationNotFoundError();
        }

        let deletedLocation = await this.repository.delete({ id });
        return deletedLocation;
    }
}

const locationService = new LocationService({ repository: locationRepository });
export default locationService;