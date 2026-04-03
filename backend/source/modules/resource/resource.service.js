import resourceRepository from "./resource.repository.js";
import * as ResourceErrors from "./resource.error.js";

class ResourceService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async create({ data }) {
        let createdResource = await this.repository.create({ data });
        return createdResource;
    }

    async get({ id }) {
        const caughtResource = await this.repository.get({ criteria: { id } });
        if (!caughtResource) {
            throw new ResourceErrors.ResourceNotFoundError();
        }
        return caughtResource;
    }

    async list() {
        const listedResources = await this.repository.list();
        return listedResources;
    }

    async update({ id, data }) {
        const caughtResource = await this.repository.get({ criteria: { id } });
        if (!caughtResource) {
            throw new ResourceErrors.ResourceNotFoundError();
        }

        let updatedResource = await this.repository.update({ id, data });
        return updatedResource;
    }

    async delete({ id }) {
        const caughtResource = await this.repository.get({ criteria: { id } });
        if (!caughtResource) {
            throw new ResourceErrors.ResourceNotFoundError();
        }

        let deletedResource = await this.repository.delete({ id });
        return deletedResource;
    }
}

const resourceService = new ResourceService({ repository: resourceRepository });
export default resourceService;