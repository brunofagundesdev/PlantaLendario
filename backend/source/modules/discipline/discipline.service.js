import disciplineRepository from "./discipline.repository.js";
import * as DisciplineErrors from "./discipline.error.js";

class DisciplineService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async create({ data }) {
        const caughtDisciplineByName = await this.repository.get({ criteria: { name: data.name } });
        if (caughtDisciplineByName) {
            throw new DisciplineErrors.DisciplineNameAlredyRegisteredError();
        }

        let createdDiscipline = await this.repository.create({ data });
        return createdDiscipline;
    }

    async get({ id }) {
        const caughtDiscipline = await this.repository.get({ criteria: { id } });
        if (!caughtDiscipline) {
            throw new DisciplineErrors.DisciplineNotFoundError();
        }
        return caughtDiscipline;
    }

    async list() {
        const listedDisciplines = await this.repository.list();
        return listedDisciplines;
    }

    async update({ id, data }) {
        const caughtDiscipline = await this.repository.get({ criteria: { id } });
        if (!caughtDiscipline) {
            throw new DisciplineErrors.DisciplineNotFoundError();
        }

        const caughtDisciplineByName = await this.repository.get({ criteria: { name: data.name } });
        if (caughtDisciplineByName) {
            throw new DisciplineErrors.DisciplineNameAlredyRegisteredError();
        }

        let updatedDiscipline = await this.repository.update({ id, data });
        return updatedDiscipline;
    }

    async delete({ id }) {
        const caughtDiscipline = await this.repository.get({ criteria: { id } });
        if (!caughtDiscipline) {
            throw new DisciplineErrors.DisciplineNotFoundError();
        }

        let deletedDiscipline = await this.repository.delete({ id });
        return deletedDiscipline;
    }
}

const disciplineService = new DisciplineService({ repository: disciplineRepository });
export default disciplineService;